import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/OrderItem.entity';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/Order.entity';
import { SelectedOptions } from './entities/SelectedOption.entity';
import { User } from 'src/user/entities/User.entity';
import { CreateOrderDTO } from './DTO/CreateOrder.dto';
import { Menu } from 'src/menu/entities/Menu.entity';
import { Option } from 'src/menu/entities/Option.entity';
import { Coupon } from 'src/coupon/entities/Coupon.entity';
import { ChangeOrderStatusRequestDTO } from './DTO/patchOrder.dto';
import { SseService } from 'src/sse/sse.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
    @InjectRepository(Option) private optionRepo: Repository<Option>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Coupon) private couponRepo: Repository<Coupon>,
    private readonly SseService: SseService,
    private dataSource: DataSource
  ) {}

  async GetOrderListById(user: User) {
    const orders = await this.orderRepo.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
    if (!orders) {
      throw new BadRequestException('존재하지 않는 유저입니다');
    }
    return orders;
  }

  async createOrder(user: User, data: CreateOrderDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const existingUser = await this.userRepo.findOne({
        where: { id: user.id },
      });

      if (!existingUser) {
        throw new NotFoundException('존재하지 않는 유저입니다');
      }

      const newOrder = queryRunner.manager.create(Order, {
        user: existingUser,
        status: OrderStatus.pending,
      });

      if (data.couponId !== undefined) {
        const existingCoupon = await this.couponRepo.findOne({
          where: { id: data.couponId, user: existingUser },
        });
        if (!existingCoupon) {
          throw new NotFoundException('존재하지 않는 쿠폰입니다');
        }
        newOrder.coupon = existingCoupon;
      }
      const savedNewOrder = await queryRunner.manager.save(newOrder);

      for (const orderItem of data.orderedItems) {
        const existingMenu = await this.menuRepo.findOne({
          where: { id: orderItem.menuId, user: existingUser },
        });
        if (!existingMenu) {
          throw new NotFoundException('존재하지 않는 메뉴입니다');
        }
        const newOrderItem = queryRunner.manager.create(OrderItem, {
          menu: existingMenu,
          quantity: orderItem.quantity,
          order: savedNewOrder,
        });

        const savedNewOrderItem = await queryRunner.manager.save(newOrderItem);

        if (orderItem.selectedOptions) {
          for (const selectedOption of orderItem.selectedOptions) {
            const existingOption = await this.optionRepo.findOne({
              where: {
                id: selectedOption.optionId,
                menu: { user: existingUser },
              },
              relations: ['menu.user'],
            });
            if (!existingOption) {
              throw new NotFoundException('존재하지 않는 옵션 입니다');
            }
            const optionToSave = queryRunner.manager.create(SelectedOptions, {
              option: existingOption,
              orderItem: savedNewOrderItem,
            });
            await queryRunner.manager.save(optionToSave);
          }
        }
      }

      // const promises = data.orderedItems.map(async (orderItem) => {
      //   const existingMenu = await this.menuRepo.findOne({
      //     where: { id: orderItem.menuId, user: existingUser },
      //   });
      //   if (!existingMenu) {
      //     throw new NotFoundException('존재하지 않는 메뉴입니다');
      //   }

      //   const newOrderItem = queryRunner.manager.create(OrderItem, {
      //     menu: existingMenu,
      //     quantity: orderItem.quantity,
      //     order: savedNewOrder,
      //   });
      //   const savedNewOrderItem = await queryRunner.manager.save(newOrderItem);

      //   if (orderItem.selectedOptions) {
      //     const optionPromises = orderItem.selectedOptions.map(
      //       async (selectedOption) => {
      //         const existingOption = await this.optionRepo.findOne({
      //           where: {
      //             id: selectedOption.optionId,
      //             menu: { user: existingUser },
      //           },
      //           relations: ['menu.user'],
      //         });
      //         if (!existingOption) {
      //           throw new NotFoundException('존재하지 않는 옵션입니다');
      //         }

      //         const optionToSave = queryRunner.manager.create(SelectedOptions, {
      //           option: existingOption,
      //           orderItem: savedNewOrderItem,
      //         });
      //         return queryRunner.manager.save(optionToSave);
      //       }
      //     );
      //     await Promise.all(optionPromises);
      //   }
      // });
      // await Promise.all(promises);

      await queryRunner.commitTransaction();
      const createdOrder = await this.orderRepo.findOne({
        where: { id: savedNewOrder.id },
        relations: ['user'],
      });
      this.SseService.emitNewOrder(createdOrder);
      return createdOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async changeStatus(
    user: User,
    orderId: number,
    status: ChangeOrderStatusRequestDTO['status']
  ) {
    const existingOrder = await this.orderRepo.findOne({
      where: { id: orderId, user },
    });
    if (!existingOrder) {
      throw new BadRequestException('존재하지 않는 주문입니다');
    }
    existingOrder.status = status;
    return await this.orderRepo.save(existingOrder);
  }
}
