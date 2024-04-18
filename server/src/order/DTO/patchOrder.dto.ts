import { IsEnum } from 'class-validator';
import { OrderStatus } from '../entities/Order.entity';

export class ChangeOrderStatusRequestDTO {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
