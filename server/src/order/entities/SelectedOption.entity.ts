import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { Option } from 'src/menu/entities/Option.entity';

@Entity()
export class SelectedOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.selectedOptions)
  orderItem: OrderItem;

  @ManyToOne(() => Option, (option) => option.id, { eager: true })
  option: Option;
}
