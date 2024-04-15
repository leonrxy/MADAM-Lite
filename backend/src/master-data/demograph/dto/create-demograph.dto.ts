import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDemographDto {
    @IsNotEmpty()
    @IsString()
    parameter_name: string;

    @IsOptional()
    @IsString()
    custom_result_parameter: string;
    
}
