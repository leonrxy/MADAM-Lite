import { Injectable } from '@nestjs/common';
import { CreatePsychographResponseDatumDto } from './dto/create-psychograph-response-datum.dto';
import { UpdatePsychographResponseDatumDto } from './dto/update-psychograph-response-datum.dto';

@Injectable()
export class PsychographResponseDataService {
  create(createPsychographResponseDatumDto: CreatePsychographResponseDatumDto) {
    return 'This action adds a new psychographResponseDatum';
  }

  findAll() {
    return `This action returns all psychographResponseData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} psychographResponseDatum`;
  }

  update(id: number, updatePsychographResponseDatumDto: UpdatePsychographResponseDatumDto) {
    return `This action updates a #${id} psychographResponseDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} psychographResponseDatum`;
  }
}
