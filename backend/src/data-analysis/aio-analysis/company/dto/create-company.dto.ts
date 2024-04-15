import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    company_name: string;

    @IsNotEmpty()
    @IsString()
    industry: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}
