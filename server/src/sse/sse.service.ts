import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject, filter, map } from 'rxjs';
import { Order } from 'src/order/entities/Order.entity';
import { User } from 'src/user/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SseService {
  @InjectRepository(User) private userRepo: Repository<User>;

  private shop$: Subject<Order> = new Subject();
  private observer = this.shop$.asObservable();

  // 이벤트 발생 함수
  emitNewOrder(order: Order) {
    // next를 통해 이벤트를 생성
    this.shop$.next(order);
  }

  async subscribeNewOrder(shopId: string, user: User) {
    if (String(user.id) !== String(shopId)) {
      throw new UnauthorizedException('권한이 없습니다');
    }
    const existingUser = await this.userRepo.findOne({
      where: { id: Number(shopId) },
    });
    if (!existingUser) {
      throw new BadRequestException('올바르지 않은 값 입니다');
    }
    return this.observer.pipe(
      // 유저 필터링
      filter((order: Order) => {
        return String(order.user.id) === shopId;
      }),
      // 데이터 전송
      map((order) => {
        const { user, ...ommitedData } = order;
        return {
          data: ommitedData,
        } as MessageEvent<Order>;
      })
    );
  }
}
