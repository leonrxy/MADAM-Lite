import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AioAnalysisResponseService } from './aio-analysis-response.service';
import { CreateAioAnalysisResponseDto } from './dto/create-aio-analysis-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('aio-analysis')
@UseGuards(new JwtAuthGuard(['superadmin', 'user']))
export class AioAnalysisResponseController {
  constructor(private readonly aioAnalysisResponseService: AioAnalysisResponseService) { }

  @Post()
  async submit(@Body() createAioAnalysisResponseDto: CreateAioAnalysisResponseDto, @Request() req) {
    const user_id = req.user.user_id;
    return await this.aioAnalysisResponseService.submit(createAioAnalysisResponseDto, user_id);
  }


  @Get()
  findAll() {
    return this.aioAnalysisResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aioAnalysisResponseService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aioAnalysisResponseService.remove(+id);
  }
}
