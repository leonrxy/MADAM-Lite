import { Injectable } from '@nestjs/common';
import { CreateActivityHistoryDto } from './dto/create-activity-history.dto';
import { UpdateActivityHistoryDto } from './dto/update-activity-history.dto';

@Injectable()
export class ActivityHistoryService {
  create(createActivityHistoryDto: CreateActivityHistoryDto) {
    return 'This action adds a new activityHistory';
  }

  findAll() {
    return `This action returns all activityHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityHistory`;
  }

  update(id: number, updateActivityHistoryDto: UpdateActivityHistoryDto) {
    return `This action updates a #${id} activityHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityHistory`;
  }
}
