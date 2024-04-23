import { Product } from "./Products";

export interface Order {
  id: number;
  createdAt: string;
  orderedItems: OrderedItem[];
  status: "pending" | "cancled" | "success";
}

export interface OrderedItem extends Product {
  quantity: number;
}
