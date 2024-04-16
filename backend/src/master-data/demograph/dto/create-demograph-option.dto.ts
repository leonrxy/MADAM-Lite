import { IsNotEmpty, IsString } from "class-validator";

export class CreateDemographOptionDto {
    demograph_option_id: number;
    demograph_id: number;

    @IsNotEmpty()
    @IsString()
    option_value: string;

    @IsNotEmpty()
    @IsString()
    result_value: string;

}
