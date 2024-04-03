import { Module } from '@nestjs/common';
import { CompanyInformationResponseService } from './company-information-response.service';
import { CompanyInformationResponseController } from './company-information-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyInformationResponse } from './entities/company-information-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyInformationResponse])],
  controllers: [CompanyInformationResponseController],
  providers: [CompanyInformationResponseService],
})
export class CompanyInformationResponseModule { }
