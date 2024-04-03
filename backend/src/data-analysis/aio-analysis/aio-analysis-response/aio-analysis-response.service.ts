import { Injectable } from '@nestjs/common';
import { CreateAioAnalysisResponseDto } from './dto/create-aio-analysis-response.dto';
import { UpdateAioAnalysisResponseDto } from './dto/update-aio-analysis-response.dto';

@Injectable()
export class AioAnalysisResponseService {
  create(createAioAnalysisResponseDto: CreateAioAnalysisResponseDto) {
    return 'This action adds a new aioAnalysisResponse';
  }

  findAll() {
    return `This action returns all aioAnalysisResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aioAnalysisResponse`;
  }

  update(id: number, updateAioAnalysisResponseDto: UpdateAioAnalysisResponseDto) {
    return `This action updates a #${id} aioAnalysisResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} aioAnalysisResponse`;
  }
}
