import { PartialType } from '@nestjs/mapped-types';
import { CreateDemographResponseDto } from './create-demograph-response.dto';

export class UpdateDemographResponseDto extends PartialType(CreateDemographResponseDto) {}
