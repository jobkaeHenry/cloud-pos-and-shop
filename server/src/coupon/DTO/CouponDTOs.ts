import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export enum CouponType {
  amount = 'amount',
  rate = 'rate',
}

export class CreateCouponDTO {
  @IsString()
  title: string;

  @IsEnum(CouponType)
  type: 'amount' | 'rate';

  @IsNumber()
  @Min(0)
  amount: number;
}

export class ChangeCouponRequestDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(CouponType)
  type?: 'amount' | 'rate';

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;
}

export class CouponResponseDTO {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  type: 'amount' | 'rate';
  @Expose()
  amount: number;
}
