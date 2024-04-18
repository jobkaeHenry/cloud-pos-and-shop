import { User } from 'src/user/entities/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { Coupon } from 'src/coupon/entities/Coupon.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'time with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'orderItems' })
  orderedItems: OrderItem[];

  @ManyToOne(() => Coupon, (coupon) => coupon.id)
  coupon: Coupon;

  @Column()
  status: OrderStatus;
}

export enum OrderStatus {
  pending = 'pending',
  success = 'success',
  cancled = 'cancled',
}
