import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyInformationResponseDto {
    aio_analysis_response_id: number;

    company_id: number;

    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsNotEmpty()
    @IsString()
    email_address: string;

    @IsNotEmpty()
    @IsString()
    position_or_title: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;
}