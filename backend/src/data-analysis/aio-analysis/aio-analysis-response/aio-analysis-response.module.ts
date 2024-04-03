import { Module } from '@nestjs/common';
import { AioAnalysisResponseService } from './aio-analysis-response.service';
import { AioAnalysisResponseController } from './aio-analysis-response.controller';
import { AioAnalysisResponse } from './entities/aio-analysis-response.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AioAnalysisResponse])],
  controllers: [AioAnalysisResponseController],
  providers: [AioAnalysisResponseService],
})
export class AioAnalysisResponseModule {}
