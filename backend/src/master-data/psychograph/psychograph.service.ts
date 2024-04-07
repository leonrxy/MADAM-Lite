import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  async create(createPsychographDto: CreatePsychographDto) {
    try {
      const psychograph = new Psychograph();
      psychograph.option_value = createPsychographDto.option_value;
      psychograph.type = createPsychographDto.type;

      const savedPsychograph = await this.psychographRepository.save(psychograph);
      return {
        success: true,
        message: 'Psychograph created successfully',
        data: savedPsychograph,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create psychograph');
    }
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
    try {
      const updatedPsychograph = await this.psychographRepository.save(psychograph);
      return {
        success: true,
        message: 'Psychograph updated successfully',
        data: updatedPsychograph,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update psychograph');
    }
  }

  async remove(id: number) {
    const psychograph = await this.findOne(id);
    if (!psychograph) {
      throw new NotFoundException('Psychograph not found');
    }

    try {
      const removedPsychograph = await this.psychographRepository.remove(psychograph);
      return {
        success: true,
        message: 'Psychograph removed successfully',
        data: removedPsychograph,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove psychograph');
    }
  }
}
