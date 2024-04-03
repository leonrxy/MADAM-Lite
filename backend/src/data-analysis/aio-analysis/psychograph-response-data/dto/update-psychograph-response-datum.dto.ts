import { PartialType } from '@nestjs/mapped-types';
import { CreatePsychographResponseDatumDto } from './create-psychograph-response-datum.dto';

export class UpdatePsychographResponseDatumDto extends PartialType(CreatePsychographResponseDatumDto) {}
