import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemographOptionService } from './demograph-option.service';
import { CreateDemographOptionDto } from './dto/create-demograph-option.dto';
import { UpdateDemographOptionDto } from './dto/update-demograph-option.dto';

@Controller('demograph-option')
export class DemographOptionController {
  constructor(private readonly demographOptionService: DemographOptionService) { }

  @Get('dropdown')
  getDemographsWithOptions() {
    return this.demographOptionService.getDemographsWithOptions();
  }

  @Post() // Ambil demographId dari URL
  create(@Body() createDemographOptionDto: CreateDemographOptionDto) {
    return this.demographOptionService.create(createDemographOptionDto);
  }

  @Get()
  findAll() {
    return this.demographOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demographOptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemographOptionDto: UpdateDemographOptionDto) {
    return this.demographOptionService.update(+id, updateDemographOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demographOptionService.remove(+id);
  }
}
