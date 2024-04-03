import { Module } from '@nestjs/common';
import { PsychographResponseService } from './psychograph-response.service';
import { PsychographResponseController } from './psychograph-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsychographResponse } from './entities/psychograph-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PsychographResponse])],
  controllers: [PsychographResponseController],
  providers: [PsychographResponseService],
})
export class PsychographResponseModule {}
