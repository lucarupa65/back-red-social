import { IsEmail, IsNumber, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, minúscula y un número.'
    })
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsNumber()
    @Min(0)
    Age: number;
}