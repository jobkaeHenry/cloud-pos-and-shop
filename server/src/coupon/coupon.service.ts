import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/Coupon.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/User.entity';
import { ChangeCouponRequestDTO, CreateCouponDTO } from './DTO/CouponDTOs';

@Injectable()
export class CouponService {
  constructor(@InjectRepository(Coupon) private repo: Repository<Coupon>) {}

  async createCoupon({ title, type, amount }: CreateCouponDTO, user: User) {
    this.checkIsValiedAmout({ type, amount });
    const newCoupon = this.repo.create({ title, type, amount });

    newCoupon.user = user;
    return await this.repo.save(newCoupon);
  }

  async getCouponByUserToken(user: User) {
    const coupons = await this.repo.find({
      where: { user: { id: Number(user.id) } },
    });
    return coupons;
  }

  async getCouponByDomainName(domainName: string) {
    const coupons = await this.repo.find({
      where: { user: { setting: { domainName } } },
    });
    return coupons;
  }
  // FIXME 유저체크
  async patchCoupon(menuId: Coupon['id'], updateValue: ChangeCouponRequestDTO) {
    this.checkIsValiedAmout({
      type: updateValue.type,
      amount: updateValue.amount,
    });

    const prevCoupon = await this.repo.findOne({ where: { id: menuId } });
    if (!prevCoupon) {
      throw new NotFoundException('해당하는 쿠폰이 없습니다');
    }
    Object.assign(prevCoupon, { ...updateValue });
    return await this.repo.save(prevCoupon);
  }

  // FIXME 유저체크
  async deleteCouponByCouponId(couponId: Coupon['id']) {
    const couponToDelete = await this.repo.findOne({ where: { id: couponId } });
    if (!couponToDelete) {
      throw new BadRequestException('존재하지 않는 쿠폰입니다');
    }
    await this.repo.softRemove(couponToDelete);
    return 'Completly removed';
  }
  /**
   * 쿠폰 타입이 Rate일때, 0~100사이의 값인지 체크하는 체커
   */
  checkIsValiedAmout = ({ type, amount }: ChangeCouponRequestDTO) => {
    if (type === 'rate' && (amount <= 0 || amount >= 100)) {
      throw new BadRequestException('rate는 0~100 사이의 값이어야 합니다');
    }
  };
}
