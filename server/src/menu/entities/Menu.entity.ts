import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/User.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from './Option.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @OneToMany(() => Option, (option) => option.menu, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  option?: Option[];

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deletedAt: Date;
}
