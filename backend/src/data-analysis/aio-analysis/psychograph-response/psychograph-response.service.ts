import { Injectable } from '@nestjs/common';
import { CreatePsychographResponseDto } from './dto/create-psychograph-response.dto';
import { UpdatePsychographResponseDto } from './dto/update-psychograph-response.dto';

@Injectable()
export class PsychographResponseService {
  create(createPsychographResponseDto: CreatePsychographResponseDto) {
    return 'This action adds a new psychographResponse';
  }

  findAll() {
    return `This action returns all psychographResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} psychographResponse`;
  }

  update(id: number, updatePsychographResponseDto: UpdatePsychographResponseDto) {
    return `This action updates a #${id} psychographResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} psychographResponse`;
  }
}
