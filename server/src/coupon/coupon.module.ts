import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/Coupon.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PublicCouponController } from './PublicCoupon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), AuthModule],
  providers: [CouponService],
  controllers: [CouponController, PublicCouponController],
})
export class CouponModule {}
