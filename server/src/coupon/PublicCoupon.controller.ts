import { Controller, Get, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponResponseDTO } from './DTO/CouponDTOs';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';

@Controller('coupon')
export class PublicCouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get(':domainName')
  @Serialize(CouponResponseDTO)
  async getCouponByUserToken(@Param('domainName') domainName: string) {
    return this.couponService.getCouponByDomainName(domainName);
  }
}
