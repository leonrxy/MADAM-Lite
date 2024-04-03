import { PartialType } from '@nestjs/mapped-types';
import { CreateDemographDto } from './create-demograph.dto';

export class UpdateDemographDto extends PartialType(CreateDemographDto) {}
