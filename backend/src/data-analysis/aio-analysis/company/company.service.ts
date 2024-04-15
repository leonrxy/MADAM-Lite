import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository:
      Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    try {

      const savedCompany = await this.companyRepository.save(createCompanyDto);

      return {
        success: true,
        message: 'Company created successfully',
        data: savedCompany,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create psychograph');
    }
  }
}
