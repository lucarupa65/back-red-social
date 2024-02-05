import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Email User',
    uniqueItems: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Abc123',
    description: 'User password',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una letra mayúscula, minúscula y un número.',
  })
  password: string;

  @ApiProperty({
    example: 'Luis Ra',
    description: 'Usare name',
    default: null,
  })
  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty({
    example: 0,
    description: 'Age users',
  })
  @IsNumber()
  @Min(0)
  Age: number;
}
