import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PsychographResponseDataService } from './psychograph-response-data.service';
import { CreatePsychographResponseDatumDto } from './dto/create-psychograph-response-datum.dto';
import { UpdatePsychographResponseDatumDto } from './dto/update-psychograph-response-datum.dto';

@Controller('psychograph-response-data')
export class PsychographResponseDataController {
  constructor(private readonly psychographResponseDataService: PsychographResponseDataService) {}

  @Post()
  create(@Body() createPsychographResponseDatumDto: CreatePsychographResponseDatumDto) {
    return this.psychographResponseDataService.create(createPsychographResponseDatumDto);
  }

  @Get()
  findAll() {
    return this.psychographResponseDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.psychographResponseDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePsychographResponseDatumDto: UpdatePsychographResponseDatumDto) {
    return this.psychographResponseDataService.update(+id, updatePsychographResponseDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.psychographResponseDataService.remove(+id);
  }
}
