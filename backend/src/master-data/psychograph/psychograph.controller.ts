import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PsychographService } from './psychograph.service';
import { CreatePsychographDto } from './dto/create-psychograph.dto';
import { UpdatePsychographDto } from './dto/update-psychograph.dto';

@Controller('psychograph')
export class PsychographController {
  constructor(private readonly psychographService: PsychographService) {}

  @Post()
  create(@Body() createPsychographDto: CreatePsychographDto) {
    return this.psychographService.create(createPsychographDto);
  }

  @Get()
  findAll() {
    return this.psychographService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.psychographService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePsychographDto: UpdatePsychographDto) {
    return this.psychographService.update(+id, updatePsychographDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.psychographService.remove(+id);
  }
}
