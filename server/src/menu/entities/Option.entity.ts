import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './Menu.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Option {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  title: string;

  @Expose()
  @Column()
  price: number;

  @ManyToOne(() => Menu, (menu) => menu.id)
  menu: Menu;

  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deletedAt: Date;
}
