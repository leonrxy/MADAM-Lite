import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDemographDto } from './dto/create-demograph.dto';
import { UpdateDemographDto } from './dto/update-demograph.dto';
import { Demograph } from './entities/demograph.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemographOption } from './entities/demograph-option.entity';

@Injectable()
export class DemographService {
  constructor(
    @InjectRepository(Demograph)
    private readonly demographRepository:
      Repository<Demograph>,

    @InjectRepository(DemographOption)
    private readonly demographOptionRepository: Repository<DemographOption>,
  ) {
  }
  async create(createDemographDto: CreateDemographDto) {
    try {
      const demograph = this.demographRepository.create(createDemographDto);

      const savedDemograph = await this.demographRepository.save(demograph);

      return {
        status: "success",
        message: 'Demograph created successfully',
        data: savedDemograph,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create demograph');
    }
  }

  async findAll(): Promise<Demograph[]> {
    const demographs = await this.demographRepository.find({ relations: ['list_of_options'] });
    return demographs.map(demograph => ({
      ...demograph,
      number_of_options: demograph.list_of_options ? demograph.list_of_options.length : 0,
    }));
  }

  async findOne(demograph_id: number): Promise<Demograph | any> {
    return await this.demographRepository.findOne({ where: { demograph_id } });
  }

  async update(id: number, updateDemographDto: UpdateDemographDto) {
    const demograph = await this.findOne(id);
    if (!demograph) {
      throw new NotFoundException('Demograph not found')
    };

    Object.assign(demograph, updateDemographDto);

    try {
      const updatedDemograph = await this.demographRepository.save(demograph);
      return {
        status: "success",
        message: 'Demograph updated successfully',
        data: updatedDemograph,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update demograph');
    }

  }

  async remove(demograph_id: number) {
    const demograph = await this.findOne(demograph_id);
    if (!demograph) {
      throw new NotFoundException('Demograph not found')
    }

    try {
      const demographOptions = await this.demographOptionRepository.find({
        where: { demograph_id: demograph.demograph_id },
      });
      if(!demographOptions || demographOptions.length === 0) {
        throw new NotFoundException('Demograph options not found')
      }
      console.log(demograph)
      console.log(demographOptions);

      await Promise.all(
        demographOptions.map(async (option) =>
          this.demographOptionRepository.remove(option),
        ),
      );

      const removedDemograph = await this.demographRepository.remove(demograph);
      return {
        status: "success",
        message: 'Demograph removed successfully',
        data: removedDemograph,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove demograph');
    }
  }
}
