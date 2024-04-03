import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PsychographResponseService } from './psychograph-response.service';
import { CreatePsychographResponseDto } from './dto/create-psychograph-response.dto';
import { UpdatePsychographResponseDto } from './dto/update-psychograph-response.dto';

@Controller('psychograph-response')
export class PsychographResponseController {
  constructor(private readonly psychographResponseService: PsychographResponseService) {}

  @Post()
  create(@Body() createPsychographResponseDto: CreatePsychographResponseDto) {
    return this.psychographResponseService.create(createPsychographResponseDto);
  }

  @Get()
  findAll() {
    return this.psychographResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.psychographResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePsychographResponseDto: UpdatePsychographResponseDto) {
    return this.psychographResponseService.update(+id, updatePsychographResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.psychographResponseService.remove(+id);
  }
}
