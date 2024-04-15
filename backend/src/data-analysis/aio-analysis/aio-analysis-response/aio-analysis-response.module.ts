import { Module } from '@nestjs/common';
import { AioAnalysisResponseService } from './aio-analysis-response.service';
import { AioAnalysisResponseController } from './aio-analysis-response.controller';
import { AioAnalysisResponse } from './entities/aio-analysis-response.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyInformationResponse } from '../company-information-response/entities/company-information-response.entity';
import { Company } from '../company/entities/company.entity';
import { DemographResponse } from '../demograph-response/entities/demograph-response.entity';
import { PsychographResponse } from '../psychograph-response/entities/psychograph-response.entity';
import { PsychographResponseData } from '../psychograph-response-data/entities/psychograph-response-data.entity';
import { User } from 'src/users/entities/user.entity';
import { ActivityHistory } from 'src/activity-history/entities/activity-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AioAnalysisResponse]),
  TypeOrmModule.forFeature([CompanyInformationResponse]),
  TypeOrmModule.forFeature([Company]),
  TypeOrmModule.forFeature([DemographResponse]),
  TypeOrmModule.forFeature([PsychographResponse]),
  TypeOrmModule.forFeature([PsychographResponseData]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([ActivityHistory]),
  ],
  controllers: [AioAnalysisResponseController],
  providers: [AioAnalysisResponseService],
})
export class AioAnalysisResponseModule { }
