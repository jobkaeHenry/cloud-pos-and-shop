import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from './entities/Order.entity';
import { OrderItem } from './entities/OrderItem.entity';
import { SelectedOptions } from './entities/SelectedOption.entity';
import { Menu } from 'src/menu/entities/Menu.entity';
import { Option } from 'src/menu/entities/Option.entity';
import { Coupon } from 'src/coupon/entities/Coupon.entity';
import { User } from 'src/user/entities/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      SelectedOptions,
      Menu,
      Option,
      Coupon,
      User,
    ]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
