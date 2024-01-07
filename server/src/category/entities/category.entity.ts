import { Expose } from 'class-transformer';
import { Menu } from 'src/menu/entities/Menu.entity';
import { User } from 'src/user/entities/User.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => Menu, (menu) => menu.category, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  menu?: Menu[];

  @DeleteDateColumn({
    type: 'time with time zone',
  })
  deletedAt: Date;
}
