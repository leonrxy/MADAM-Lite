import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDemographDto{
    @IsNotEmpty()
    @IsString()
    parameter_name: string;

    @IsString()
    custom_result_parameter: string;
}
