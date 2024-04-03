import { IsNotEmpty, IsString } from "class-validator";

export class CreateDemographOptionDto {
    @IsNotEmpty()
    demograph_id: number;

    @IsNotEmpty()
    @IsString()
    option_value: string;

    @IsNotEmpty()
    @IsString()
    result_value: string;

    created_at: Date;
    updated_at: Date;
}
