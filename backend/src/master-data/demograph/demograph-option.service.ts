import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemographOptionDto } from './dto/create-demograph-option.dto';
import { UpdateDemographOptionDto } from './dto/update-demograph-option.dto';
import { DemographOption } from './entities/demograph-option.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Demograph } from './entities/demograph.entity';

@Injectable()
export class DemographOptionService {
    constructor(
        @InjectRepository(DemographOption)
        private readonly demographOptionRepository: Repository<DemographOption>,
        @InjectRepository(Demograph)
        private readonly demographRepository: Repository<Demograph>,
    ) { }

    async create(createDemographOptionDto: CreateDemographOptionDto): Promise<DemographOption> {
        // Cari Demograph berdasarkan ID
        const demograph = await this.demographRepository.findOne({ where: { demograph_id: createDemographOptionDto.demograph_id } });
        if (!demograph) {
            throw new NotFoundException('Demograph not found');
        }
        const demographOption = this.demographOptionRepository.create({
            ...createDemographOptionDto,
            demograph_id: demograph
        });
        return await this.demographOptionRepository.save(demographOption);
    }

    async findAll(): Promise<DemographOption[]> {
        return await this.demographOptionRepository.find({ relations: ['demograph_id'] });
    }

    async findOne(demograph_option_id: number): Promise<DemographOption> {
        return await this.demographOptionRepository.findOne({ where: { demograph_option_id }, relations: ['demograph_id'] });
    }

    async update(id: number, updateDemographOptionDto: UpdateDemographOptionDto): Promise<DemographOption> {
        const demographOption = await this.findOne(id);
        if (!demographOption) {
            throw new NotFoundException('DemographOption not found');
        }

        demographOption.option_value = updateDemographOptionDto.option_value;

        if (updateDemographOptionDto.demograph_id) {
            const demograph = await this.demographRepository.findOne({
                where: { demograph_id: updateDemographOptionDto.demograph_id },
            });
            if (!demograph) {
                throw new NotFoundException('Demograph not found');
            }
            demographOption.demograph_id = demograph;
        }

        return await this.demographOptionRepository.save(demographOption);

    }

    async remove(id: number): Promise<void> {
        const demographOption = await this.findOne(id);
        if (!demographOption) {
            // Handle entity not found
            return;
        }

        await this.demographOptionRepository.remove(demographOption);
    }

    async getDemographsWithOptions() {
        const demographs = await this.demographRepository.find({ relations: ['options'] });
        console.log('Demograph:', demographs);

        // Membentuk struktur data yang cocok untuk dropdown
        const dropdownData = demographs.map(demograph => {
            console.log('Demograph:', demograph);
            return {
                ...demograph,
                options: demograph.options.map(option => ({
                    id: option.demograph_option_id,
                    option_value: option.option_value,
                    result_value: option.result_value
                }))
            };
        });
        return dropdownData;
    }
}
