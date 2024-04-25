import { Coupon } from "./Coupons";
import { Product } from "./Products";

export interface Order {
  id: number;
  createdAt: string;
  orderedItems: OrderedItem[];
  status: "pending" | "cancled" | "success";
  coupon?: Coupon;
}

export interface OrderedItem extends Product {
  quantity: number;
}
