import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    new_password: string;
}