import { Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Menu } from '../entities/Menu.entity';
import { Category } from 'src/category/entities/category.entity';
import { CreateOptionDTO } from './Option.dto';

export class CreateMenuDTO {
  @IsString()
  title: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  description: string;

  @IsNumber()
  categoryId: number;

  @IsArray()
  @IsOptional()
  option: CreateOptionDTO[];
}

export class GetSingleMenuDTO {
  @Expose()
  title: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  id: number;

  @Transform(({ obj }: { obj: Menu }) => obj.category)
  @Expose()
  category: Category;

  @Transform(({ obj }: { obj: Menu }) => obj.user.id)
  @Expose()
  userId: number;
}
