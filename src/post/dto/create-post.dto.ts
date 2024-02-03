import { IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    title: string;

    @IsString()
    @MinLength(6)
    content: string;
}
