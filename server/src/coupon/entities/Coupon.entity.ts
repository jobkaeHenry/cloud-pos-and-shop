import { User } from 'src/user/entities/User.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  title: string;

  @Column()
  type: 'amount' | 'rate';

  @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @DeleteDateColumn({
    type: 'time with time zone',
  })
  deletedAt: Date;
}
