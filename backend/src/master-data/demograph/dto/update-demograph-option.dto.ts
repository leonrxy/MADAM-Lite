import { PartialType } from '@nestjs/mapped-types';
import { CreateDemographOptionDto } from './create-demograph-option.dto';

export class UpdateDemographOptionDto extends PartialType(CreateDemographOptionDto) {}
