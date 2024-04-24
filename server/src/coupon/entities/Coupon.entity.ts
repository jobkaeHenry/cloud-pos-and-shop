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

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deletedAt: Date;
}
