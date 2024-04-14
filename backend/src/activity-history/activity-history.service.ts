import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateActivityHistoryDto } from './dto/create-activity-history.dto';
import { ActivityHistory } from './entities/activity-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ActivityHistoryService {
  constructor(
    @InjectRepository(ActivityHistory)
    private readonly activityHistoryRepository:
      Repository<ActivityHistory>,
    @InjectRepository(User)
    private readonly userRepository:
      Repository<User>,
  ) { }

  async create(createActivityHistoryDto: CreateActivityHistoryDto) {
    const user = await this.userRepository.findOne({ where: { user_id: createActivityHistoryDto.user_id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const activityHistory = this.activityHistoryRepository.create({
        ...createActivityHistoryDto,
        user_id: user
      });
      const savedActivityHistory = await this.activityHistoryRepository.save(activityHistory);
      return {
        success: true,
        message: 'Activity history created successfully',
        data: savedActivityHistory,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create psychograph');
    }
  }

  findAll() {
    return `This action returns all activityHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityHistory`;
  }
}
