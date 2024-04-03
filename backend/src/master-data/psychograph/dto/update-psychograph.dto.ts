import { PartialType } from '@nestjs/mapped-types';
import { CreatePsychographDto } from './create-psychograph.dto';

export class UpdatePsychographDto extends PartialType(CreatePsychographDto) {}
