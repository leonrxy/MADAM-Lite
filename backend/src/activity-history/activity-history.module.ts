import { Module } from '@nestjs/common';
import { ActivityHistoryService } from './activity-history.service';
import { ActivityHistoryController } from './activity-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityHistory } from './entities/activity-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityHistory])],
  controllers: [ActivityHistoryController],
  providers: [ActivityHistoryService],
})
export class ActivityHistoryModule {}
