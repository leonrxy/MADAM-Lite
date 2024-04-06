import { PartialType } from '@nestjs/mapped-types';
import { CreatePsychographDto } from './create-psychograph.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePsychographDto extends PartialType(CreatePsychographDto) {

    @IsNotEmpty()
    @IsString()
    option_value: string;
}
