import { IsNotEmpty, IsString } from "class-validator";

export class CreateDemographDto {
    @IsNotEmpty()
    @IsString()
    parameter_name: string;
    
}
