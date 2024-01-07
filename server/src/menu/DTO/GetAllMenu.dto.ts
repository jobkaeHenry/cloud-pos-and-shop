import { Expose } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';
import { Option } from '../entities/Option.entity';

export class GetAllMenuDTO {
  @Expose()
  title: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  id: number;

  @Expose()
  category: Category;

  @Expose()
  option: Option;
}
