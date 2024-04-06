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

    async create(createDemographOptionDto: CreateDemographOptionDto): Promise<DemographOption | any> {
        // Cari Demograph berdasarkan ID
        const demograph = await this.demographRepository.findOne({ where: { demograph_id: createDemographOptionDto.demograph_id } });
        if (!demograph) {
            throw new NotFoundException('Demograph not found');
        }
        const demographOption = this.demographOptionRepository.create({
            ...createDemographOptionDto,
            demograph_id: demograph
        });
        const savedDemographOption = await this.demographOptionRepository.save(demographOption);
        return {
            success: true,
            message: 'Demograph option created successfully',
            data: savedDemographOption,
        };
    }

    async findAll(): Promise<DemographOption[]> {
        return await this.demographOptionRepository.find({ relations: ['demograph_id'] });
    }

    async findOne(demograph_option_id: number): Promise<DemographOption> {
        return await this.demographOptionRepository.findOne({ where: { demograph_option_id }, relations: ['demograph_id'] });
    }

    async update(id: number, updateDemographOptionDto: UpdateDemographOptionDto) {
        const demographOption = await this.findOne(id);
        if (!demographOption) {
            throw new NotFoundException('DemographOption not found');
        }

        Object.assign(demographOption, updateDemographOptionDto);

        const updatedDemographOption = await this.demographOptionRepository.save(demographOption);

        return {
            success: true,
            message: 'Demograph updated successfully',
            data: updatedDemographOption,
        };

    }

    async remove(id: number) {
        const demographOption = await this.findOne(id);
        if (!demographOption) {
            throw new NotFoundException('Demograph option not found')
        }

        const removedDemographOption = await this.demographOptionRepository.remove(demographOption);
        return {
            success: true,
            message: 'Demograph removed successfully',
            data: removedDemographOption,
        };
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
