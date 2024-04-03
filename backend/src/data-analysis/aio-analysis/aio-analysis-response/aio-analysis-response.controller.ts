import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AioAnalysisResponseService } from './aio-analysis-response.service';
import { CreateAioAnalysisResponseDto } from './dto/create-aio-analysis-response.dto';
import { UpdateAioAnalysisResponseDto } from './dto/update-aio-analysis-response.dto';

@Controller('aio-analysis-response')
export class AioAnalysisResponseController {
  constructor(private readonly aioAnalysisResponseService: AioAnalysisResponseService) {}

  @Post()
  create(@Body() createAioAnalysisResponseDto: CreateAioAnalysisResponseDto) {
    return this.aioAnalysisResponseService.create(createAioAnalysisResponseDto);
  }

  @Get()
  findAll() {
    return this.aioAnalysisResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aioAnalysisResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAioAnalysisResponseDto: UpdateAioAnalysisResponseDto) {
    return this.aioAnalysisResponseService.update(+id, updateAioAnalysisResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aioAnalysisResponseService.remove(+id);
  }
}
