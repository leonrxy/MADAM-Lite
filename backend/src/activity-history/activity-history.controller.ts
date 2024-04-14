import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ActivityHistoryService } from './activity-history.service';
import { CreateActivityHistoryDto } from './dto/create-activity-history.dto';

@Controller('activity-history')
export class ActivityHistoryController {
  constructor(private readonly activityHistoryService: ActivityHistoryService) {}

  @Post()
  create(@Body() createActivityHistoryDto: CreateActivityHistoryDto) {
    return this.activityHistoryService.create(createActivityHistoryDto);
  }

  @Get()
  findAll() {
    return this.activityHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityHistoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityHistoryService.remove(+id);
  }
}
