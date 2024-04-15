import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { OneToMany } from "typeorm";
import { PsychographResponseData } from "../../psychograph-response-data/entities/psychograph-response-data.entity";

export class CreatePsychographResponseDto {
    aio_analysis_response_id: number;

    @IsEnum(['activity', 'interest', 'opinion'])
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsInt()
    total_option: number;

    @OneToMany(() => PsychographResponseData, psychograph_response_data => psychograph_response_data.psychograph_response_id)
    psychograph_response_data: PsychographResponseData[];
}