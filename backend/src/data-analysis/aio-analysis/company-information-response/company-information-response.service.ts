import { Injectable } from '@nestjs/common';
import { CreateCompanyInformationResponseDto } from './dto/create-company-information-response.dto';
import { UpdateCompanyInformationResponseDto } from './dto/update-company-information-response.dto';

@Injectable()
export class CompanyInformationResponseService {
  create(createCompanyInformationResponseDto: CreateCompanyInformationResponseDto) {
    return 'This action adds a new companyInformationResponse';
  }

  findAll() {
    return `This action returns all companyInformationResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyInformationResponse`;
  }

  update(id: number, updateCompanyInformationResponseDto: UpdateCompanyInformationResponseDto) {
    return `This action updates a #${id} companyInformationResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyInformationResponse`;
  }
}
