import { Module } from '@nestjs/common';
import { DemographService } from './demograph.service';
import { DemographController } from './demograph.controller';
import { Demograph } from './entities/demograph.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemographOption } from './entities/demograph-option.entity';
import { DemographOptionController } from './demograph-option.controller';
import { DemographOptionService } from './demograph-option.service';

@Module({
  imports: [TypeOrmModule.forFeature([Demograph]), TypeOrmModule.forFeature([DemographOption])],
  controllers: [DemographController, DemographOptionController],
  providers: [DemographService, DemographOptionService],
})
export class DemographModule { }
