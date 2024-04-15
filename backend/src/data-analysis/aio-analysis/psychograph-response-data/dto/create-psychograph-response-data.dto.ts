import { IsNotEmpty, IsString } from "class-validator";

export class CreatePsychographResponseDataDto {
    psychograph_response_id: number;

    @IsNotEmpty()
    @IsString()
    selected_value: string;

}