import { Category } from "./Categories";

export interface Product {
  id: number;
  category: Category;
  title: string;
  option?: Option[];
  price: number;
  description: string;
  image?: string;
}

export interface Option {
  id: number;
  title: string;
  price: number;
}
export type Products = Product[];
