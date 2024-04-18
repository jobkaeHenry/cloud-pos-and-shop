import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDTO {
  @IsNumber()
  @IsInt()
  @IsOptional()
  couponId: number;
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  orderedItems: OrderItemDTO[];
}

export class OrderItemDTO {
  @IsNumber()
  @IsInt()
  menuId: number;

  @IsNumber()
  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSelectedRequestOptionDTO)
  selectedOptions?: CreateSelectedRequestOptionDTO[];
}

export class SelectedOptionsDTO {
  @IsNumber()
  @IsInt()
  id: number;
  @IsNumber()
  @IsInt()
  orderItemId: number;
  @IsNumber()
  @IsInt()
  optionId: number;
}

export class CreateSelectedRequestOptionDTO {
  @IsNumber()
  @IsInt()
  optionId: number;
}
