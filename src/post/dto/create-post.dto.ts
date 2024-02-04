import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Post Title',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  title: string;

  @ApiProperty({
    example: 'Anim reprehenderit nulla in anim mollit minim irure commodo.',
    description: 'Post description',
  })
  @IsString()
  @MinLength(6)
  content: string;
}
