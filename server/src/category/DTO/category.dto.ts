import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  title: string;
}

export class CreateCategoryResponseDTO {
  @Expose()
  title: string;
  @Expose()
  id: string;
}

export class PatchCategoryRequestDTO {
  @IsString()
  title: string;
}
