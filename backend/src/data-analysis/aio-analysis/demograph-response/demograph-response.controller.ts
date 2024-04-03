import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemographResponseService } from './demograph-response.service';
import { CreateDemographResponseDto } from './dto/create-demograph-response.dto';
import { UpdateDemographResponseDto } from './dto/update-demograph-response.dto';

@Controller('demograph-response')
export class DemographResponseController {
  constructor(private readonly demographResponseService: DemographResponseService) {}

  @Post()
  create(@Body() createDemographResponseDto: CreateDemographResponseDto) {
    return this.demographResponseService.create(createDemographResponseDto);
  }

  @Get()
  findAll() {
    return this.demographResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demographResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemographResponseDto: UpdateDemographResponseDto) {
    return this.demographResponseService.update(+id, updateDemographResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demographResponseService.remove(+id);
  }
}
