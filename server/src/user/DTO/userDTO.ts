import { Expose, Transform } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';
import { Coupon } from 'src/coupon/entities/Coupon.entity';
import { Setting } from 'src/setting/entity/Setting.entity';
import { User } from '../entities/User.entity';

export class UserInfoResponseDTO {
  @Expose()
  id: number;
  @Expose()
  userId: string;
  @Expose()
  shopName: string;
  @Expose()
  coupon: Coupon[];
  @Expose()
  category: Category[];

  @Expose()
  @Transform(({ obj: user }: { obj: User }) => user.setting)
  setting: Setting;
}
