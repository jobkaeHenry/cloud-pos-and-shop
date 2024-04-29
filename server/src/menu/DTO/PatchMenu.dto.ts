import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateOptionDTO, PatchOptionDTO } from './Option.dto';
import { Type } from 'class-transformer';

export class ChangeCatgoryRequestDTO {
  @IsString()
  title?: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  price?: number;

  @IsString()
  description?: string;

  @IsNumber()
  categoryId?: number;
}

export class PatchOptionByArrayDTO extends PatchOptionDTO {
  @IsNumber()
  id: number;
}

class PatchMenuRequestOptionDTO {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDTO)
  create?: CreateOptionDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PatchOptionByArrayDTO)
  patch?: PatchOptionByArrayDTO[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  remove?: number[];
}

export class PatchMenuRequestDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  adminMemo?: string;

  @IsOptional()
  option?: PatchMenuRequestOptionDTO;
}
