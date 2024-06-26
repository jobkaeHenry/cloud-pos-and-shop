import { Expose, Transform } from 'class-transformer';
import { Order, OrderStatus } from '../entities/Order.entity';
import { OrderItem } from '../entities/OrderItem.entity';
import { SelectedOptions } from '../entities/SelectedOption.entity';
import { Coupon } from 'src/coupon/entities/Coupon.entity';

export class GetStreamedOrderResponseDTO {
  @Expose()
  @Transform(({ obj: stream }: { obj: MessageEvent<Order> }) => {
    const { data } = stream;
    const { status, id, createdAt, coupon } = data;
    return {
      status,
      id,
      createdAt,
      orderedItems: mapOrderItems(data),
      coupon,
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
  @Transform(({ obj: order }: { obj: Order }) => order.coupon)
  coupon: Coupon;

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
  const { id: menuId, title, price, description, adminMemo } = menu;
  const transformedOptions = mapSelectedOptions(selectedOptions);

  return {
    id: menuId,
    title,
    price,
    description,
    option: transformedOptions,
    quantity,
    adminMemo,
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
