import { Injectable, NotFoundException } from '@nestjs/common';
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
    const demograph = this.demographRepository.create(createDemographDto);

    const savedDemograph = await this.demographRepository.save(demograph);

    return {
      success: true,
      message: 'Demograph created successfully',
      data: savedDemograph,
    };
  }

  async findAll(): Promise<Demograph[]> {
    return await this.demographRepository.find();
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

    const updatedDemograph = await this.demographRepository.save(demograph);
    return {
      success: true,
      message: 'Demograph updated successfully',
      data: updatedDemograph,
    };

  }

  async remove(id: number) {
    const demograph = await this.findOne(id);
    if (!demograph) {
      throw new NotFoundException('Demograph not found')
    }

    // Temukan semua DemographOption yang terhubung ke Demograph
    const demographOptions = await this.demographOptionRepository.find({
      where: { demograph_id: demograph.id },
    });

    // Hapus semua DemographOption yang terhubung
    await Promise.all(
      demographOptions.map(async (option) =>
        this.demographOptionRepository.remove(option),
      ),
    );

    const removedDemograph = await this.demographRepository.remove(demograph);
    return {
      success: true,
      message: 'Demograph removed successfully',
      data: removedDemograph,
    };
  }
}
