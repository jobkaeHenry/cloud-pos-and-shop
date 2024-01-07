import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import {
  ChangeCouponRequestDTO,
  CouponResponseDTO,
  CreateCouponDTO,
} from './DTO/CouponDTOs';
import { Serialize } from 'src/interceptor/serializer/serializer.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/User.entity';
import { GetUser } from 'src/auth/jwt/getUser.decorator';

@Controller('coupon')
@UseGuards(AuthGuard())
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  @Serialize(CouponResponseDTO)
  async getCouponByUserToken(@GetUser() user: User) {
    return this.couponService.getCouponByUserToken(user);
  }

  @Post()
  @Serialize(CouponResponseDTO)
  async createCoupon(@GetUser() user: User, @Body() data: CreateCouponDTO) {
    return this.couponService.createCoupon(data, user);
  }

  @Patch(':id')
  async patchCoupon(
    @Param('id', ParseIntPipe) couponId: number,
    @Body() data: ChangeCouponRequestDTO
  ) {
    return this.couponService.patchCoupon(couponId, data);
  }

  @Delete(':id')
  async deleteCoupon(@Param('id', ParseIntPipe) couponId: number) {
    return this.couponService.deleteCouponByCouponId(couponId);
  }
}
