import { PartialType } from '@nestjs/mapped-types';
import { CreatePsychographResponseDto } from './create-psychograph-response.dto';

export class UpdatePsychographResponseDto extends PartialType(CreatePsychographResponseDto) {}
