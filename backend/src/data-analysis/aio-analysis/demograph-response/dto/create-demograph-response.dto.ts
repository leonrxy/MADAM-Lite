import { IsNotEmpty, IsString } from "class-validator";

export class CreateDemographResponseDto {
    aio_analysis_response_id: number;

    @IsNotEmpty()
    @IsString()
    parameter_name: string;

    @IsNotEmpty()
    @IsString()
    selected_value: string;

    @IsNotEmpty()
    @IsString()
    result_value: string;
}