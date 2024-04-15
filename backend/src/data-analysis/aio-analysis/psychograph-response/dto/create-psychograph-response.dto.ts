import { IsEnum, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreatePsychographResponseDataDto } from "../../psychograph-response-data/dto/create-psychograph-response-data.dto";
import { Type } from "class-transformer";

export class CreatePsychographResponseDto {
    aio_analysis_response_id: number;

    @IsEnum(['activity', 'interest', 'opinion'])
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsInt()
    total_option: number;

    @ValidateNested()
    @Type(() => CreatePsychographResponseDataDto)
    psychograph_response_data: CreatePsychographResponseDto[];
}