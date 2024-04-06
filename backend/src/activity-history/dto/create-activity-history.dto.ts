import { IsNotEmpty } from "class-validator";

export class CreateActivityHistoryDto {
    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    activity: string;
}
