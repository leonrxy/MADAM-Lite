import { Module } from '@nestjs/common';
import { DemographResponseService } from './demograph-response.service';
import { DemographResponseController } from './demograph-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemographResponse } from './entities/demograph-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DemographResponse])],
  controllers: [DemographResponseController],
  providers: [DemographResponseService],
})
export class DemographResponseModule {}
