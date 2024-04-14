import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PsychographService } from './psychograph.service';
import { CreatePsychographDto } from './dto/create-psychograph.dto';
import { UpdatePsychographDto } from './dto/update-psychograph.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('psychograph')
@UseGuards(new JwtAuthGuard(['superadmin']))
export class PsychographController {
  constructor(private readonly psychographService: PsychographService) {}

  @Post()
  create(@Body() createPsychographDto: CreatePsychographDto, @Request() req) {
    const user_id = req.user.user_id;
    return this.psychographService.create(createPsychographDto, user_id);
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
  update(@Param('id') id: string, @Body() updatePsychographDto: UpdatePsychographDto, @Request() req) {
    const user_id = req.user.user_id;
    return this.psychographService.update(+id, updatePsychographDto, user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.psychographService.remove(+id);
  }
}
