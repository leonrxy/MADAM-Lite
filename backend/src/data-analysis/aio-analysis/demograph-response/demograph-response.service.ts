import { Injectable } from '@nestjs/common';
import { CreateDemographResponseDto } from './dto/create-demograph-response.dto';
import { UpdateDemographResponseDto } from './dto/update-demograph-response.dto';

@Injectable()
export class DemographResponseService {
  create(createDemographResponseDto: CreateDemographResponseDto) {
    return 'This action adds a new demographResponse';
  }

  findAll() {
    return `This action returns all demographResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demographResponse`;
  }

  update(id: number, updateDemographResponseDto: UpdateDemographResponseDto) {
    return `This action updates a #${id} demographResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} demographResponse`;
  }
}
