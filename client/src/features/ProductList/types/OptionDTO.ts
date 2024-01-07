export interface CreateOptionDTO {
  title: string;
  price: number;
}

export interface PatchOptionByArrayDTO extends CreateOptionDTO {
  id: number;
}
