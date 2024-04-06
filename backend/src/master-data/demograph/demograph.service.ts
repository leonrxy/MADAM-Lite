import { Injectable } from '@nestjs/common';
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
      Repository<Demograph>
  ) {
  }
  async create(createDemographDto: CreateDemographDto): Promise<Demograph> {
    const demograph = new Demograph();
    demograph.parameter_name = createDemographDto.parameter_name;

    return await this.demographRepository.save(demograph);
  }

  async findAll(): Promise<Demograph[]> {
    return await this.demographRepository.find();
  }

  async findOne(demograph_id: number): Promise<Demograph | any> {
    return await this.demographRepository.findOne({ where: { demograph_id } });
  }

  async update(id: number, updateDemographDto: UpdateDemographDto): Promise<Demograph> {
    const demograph = await this.findOne(id);

    // Merge updateDemographDto into the existing demograph entity
    Object.assign(demograph, updateDemographDto);

    // Convert array of string options into DemographOption entities
    const options: DemographOption[] = [];
    if (updateDemographDto.options && Array.isArray(updateDemographDto.options)) {
      for (const optionValue of updateDemographDto.options) {
        const option = new DemographOption();
        option.option_value = optionValue;
        options.push(option);
      }
    }

    // Assign the options to the demograph entity
    demograph.options = options;

    // Save the updated demograph entity
    return await this.demographRepository.save(demograph);
  }

  async remove(id: number): Promise<void> {
    const demograph = await this.findOne(id);
    await this.demographRepository.remove(demograph);
  }
}
