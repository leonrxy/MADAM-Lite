import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemographService } from './demograph.service';
import { CreateDemographDto } from './dto/create-demograph.dto';
import { UpdateDemographDto } from './dto/update-demograph.dto';
import { DemographOptionService } from './demograph-option.service';

@Controller('demograph')
export class DemographController {
  constructor(
    private readonly demographService: DemographService,
    private readonly demographOptionService: DemographOptionService,) { }

  @Post()
  create(@Body() createDemographDto: CreateDemographDto) {
    return this.demographService.create(createDemographDto);
  }

  @Get()
  findAll() {
    return this.demographService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demographService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemographDto: UpdateDemographDto) {
    return this.demographService.update(+id, updateDemographDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demographService.remove(+id);
  }
}