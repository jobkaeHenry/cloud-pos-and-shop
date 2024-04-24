import { Coupon } from 'src/coupon/entities/Coupon.entity';
import { Menu } from 'src/menu/entities/Menu.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Setting } from 'src/setting/entity/Setting.entity';
import { Order } from 'src/order/entities/Order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  shopName: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Menu, (menu) => menu.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  menu: Menu[];

  @OneToMany(() => Coupon, (coupon) => coupon.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  coupon: Coupon[];

  @OneToMany(() => Category, (category) => category.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  category: Category[];

  @OneToMany(() => Order, (order) => order.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  order: Order[];

  @OneToOne(() => Setting, (setting) => setting.user, { cascade: true })
  setting: Setting;

  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deletedAt: Date;
}
