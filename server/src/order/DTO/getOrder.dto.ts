import { Expose, Transform } from 'class-transformer';
import { Order, OrderStatus } from '../entities/Order.entity';
import { OrderItem } from '../entities/OrderItem.entity';
import { SelectedOptions } from '../entities/SelectedOption.entity';

export class GetStreamedOrderResponseDTO {
  @Expose()
  @Transform(({ obj: stream }: { obj: MessageEvent<Order> }) => {
    const { data } = stream;
    const { status, id, createdAt } = data;
    return {
      status,
      id,
      createdAt,
      orderedItems: mapOrderItems(data),
    };
  })
  data: typeof GetOrderResponseDTO;
}

export class GetOrderResponseDTO {
  @Expose()
  id: number;

  @Expose()
  status: OrderStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj: order }: { obj: Order }) => mapOrderItems(order))
  orderedItems: OrderItem[];
}

function mapOrderItems(order: Order) {
  const { orderedItems } = order;
  return orderedItems.map(mapOrderItem);
}

function mapOrderItem(orderItem: OrderItem) {
  const { menu, quantity, selectedOptions } = orderItem;
  const { id: menuId, title, price, description } = menu;
  const transformedOptions = mapSelectedOptions(selectedOptions);

  return {
    id: menuId,
    title,
    price,
    description,
    option: transformedOptions,
    quantity,
  };
}

function mapSelectedOptions(
  selectedOptions: SelectedOptions[]
): Partial<SelectedOptions>[] {
  return selectedOptions.map(({ option }) => {
    const { id, title, price } = option;
    return { id, title, price };
  });
}
