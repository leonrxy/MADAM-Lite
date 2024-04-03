import { Module } from '@nestjs/common';
import { PsychographService } from './psychograph.service';
import { PsychographController } from './psychograph.controller';
import { Psychograph } from './entities/psychograph.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Psychograph])],
  controllers: [PsychographController],
  providers: [PsychographService],
})
export class PsychographModule {}
