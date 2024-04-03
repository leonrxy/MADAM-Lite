import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyInformationResponseDto } from './create-company-information-response.dto';

export class UpdateCompanyInformationResponseDto extends PartialType(CreateCompanyInformationResponseDto) {}
