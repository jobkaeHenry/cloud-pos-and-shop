import { Menu } from 'src/menu/entities/Menu.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order.entity';
import { SelectedOptions } from './SelectedOption.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  @ManyToOne(() => Menu, (menu) => menu.id, { eager: true })
  menu: Menu;

  @OneToMany(
    () => SelectedOptions,
    (SelectedOptions) => SelectedOptions.orderItem,
    { cascade: true, eager: true }
  )
  selectedOptions: SelectedOptions[];

  @Column()
  quantity: number;

  @Column({
    type: 'time with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
