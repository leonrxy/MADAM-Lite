import { IsNotEmpty, IsString } from "class-validator";

export class CreateDemographDto {
    @IsNotEmpty()
    @IsString()
    question: string;
    
    options: string[];
}
