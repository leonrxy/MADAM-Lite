import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePsychographDto } from './dto/create-psychograph.dto';
import { UpdatePsychographDto } from './dto/update-psychograph.dto';
import { Psychograph } from './entities/psychograph.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PsychographService {
  constructor(
    @InjectRepository(Psychograph)
    private readonly psychographRepository:
      Repository<Psychograph>
  ) { }
  async create(createPsychographDto: CreatePsychographDto): Promise<Psychograph> {
    const psychograph = new Psychograph();
    psychograph.option_value = createPsychographDto.option_value;
    psychograph.type = createPsychographDto.type;

    return await this.psychographRepository.save(psychograph);
  }

  async findAll(): Promise<Psychograph[]> {
    return await this.psychographRepository.find();
  }

  async findOne(psychograph_id: number): Promise<Psychograph | any> {
    return await this.psychographRepository.findOne({ where: { psychograph_id } });
  }

  async update(id: number, updatePsychographDto: UpdatePsychographDto) {
    const psychograph = await this.findOne(id);
    if (!psychograph) {
        throw new NotFoundException('Psychograph not found');
    }
    Object.assign(psychograph, updatePsychographDto);
    return await this.psychographRepository.save(psychograph);
}

  async remove(id: number): Promise<void> {
    const psychograph = await this.findOne(id);
    await this.psychographRepository.remove(psychograph);
  }
}
