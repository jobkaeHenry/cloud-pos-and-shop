import { Expose } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOptionDTO {
  @IsString()
  title: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  price: number;
}

export class PatchOptionDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;
}

export class OptionResponseDTO {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  price: number;
}
