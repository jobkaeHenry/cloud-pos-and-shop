import { Option } from "../../../types/Products";
import { CreateOptionDTO, PatchOptionByArrayDTO } from "./OptionDTO";

export interface PatchProductDTO {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  adminMemo?: string;
  option?: {
    create?: CreateOptionDTO[];
    patch?: PatchOptionByArrayDTO[];
    remove?: number[];
  };
}

export interface CreateProductDTO {
  title: string;
  price: number;
  categoryId: number;
  adminMemo?: string;
  description: string;
  option?: Omit<Option, "id">[];
}
