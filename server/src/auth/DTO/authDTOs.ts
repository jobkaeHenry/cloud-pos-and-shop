import {
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RequestLoginDTO {
  @IsString()
  userId: string;
  @IsString()
  password: string;
}

export class RequestSignUpDTO {
  @MinLength(2)
  @MaxLength(20)
  userId: string;

  @IsStrongPassword({ minUppercase: 0, minLength: 8 })
  password: string;

  @IsString()
  shopName: string;
}
