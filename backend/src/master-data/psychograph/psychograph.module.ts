import { Module } from '@nestjs/common';
import { PsychographService } from './psychograph.service';
import { PsychographController } from './psychograph.controller';
import { Psychograph } from './entities/psychograph.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityHistory } from 'src/activity-history/entities/activity-history.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Psychograph]), TypeOrmModule.forFeature([ActivityHistory]), TypeOrmModule.forFeature([User])],
  controllers: [PsychographController],
  providers: [PsychographService],
})
export class PsychographModule { }
