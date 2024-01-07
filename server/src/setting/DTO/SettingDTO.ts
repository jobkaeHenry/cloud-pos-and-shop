import { Expose, Transform } from 'class-transformer';
import { IsAlphanumeric, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/User.entity';
import { Setting } from '../entity/Setting.entity';

export class CreateSettingDTO {
  @IsString()
  @IsAlphanumeric()
  domainName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  shopAddress?: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  shopLogo?: string;

  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;
}

export class PatchSettingDTO {
  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  domainName?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  shopAddress?: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  shopLogo?: string;

  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  secondaryColor?: string;
}

export class SettingResponseDTO {
  @Expose()
  id: number;

  @Expose()
  domainName: string;

  @Expose()
  description: string;

  @Expose()
  shopLogo: string;

  @Expose()
  primaryColor: string;

  @Expose()
  secondaryColor: string;

  @Expose()
  shopAddress: string;

  @Expose()
  contact: string;

  @Transform(({ obj }: { obj: Setting }) => obj.user.id)
  @Expose()
  userId: number;

  @Transform(({ obj }: { obj: Setting }) => obj.user.shopName)
  @Expose()
  shopName: number;
}
