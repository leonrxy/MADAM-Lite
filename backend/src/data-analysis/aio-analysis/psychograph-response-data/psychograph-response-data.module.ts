import { Module } from '@nestjs/common';
import { PsychographResponseDataService } from './psychograph-response-data.service';
import { PsychographResponseDataController } from './psychograph-response-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsychographResponseData } from './entities/psychograph-response-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PsychographResponseData])],
  controllers: [PsychographResponseDataController],
  providers: [PsychographResponseDataService],
})
export class PsychographResponseDataModule {}
