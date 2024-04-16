import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePsychographDto } from './dto/create-psychograph.dto';
import { UpdatePsychographDto } from './dto/update-psychograph.dto';
import { Psychograph } from './entities/psychograph.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityHistory } from 'src/activity-history/entities/activity-history.entity';
import { User } from 'src/users/entities/user.entity'; // Import the User entity

@Injectable()
export class PsychographService {
  constructor(
    @InjectRepository(Psychograph)
    private readonly psychographRepository:
      Repository<Psychograph>,
    @InjectRepository(ActivityHistory)
    private readonly activityHistoryRepository:
      Repository<ActivityHistory>,
    @InjectRepository(User)
    private readonly userRepository:
      Repository<User>,
  ) { }
  async create(createPsychographDto: CreatePsychographDto, user_id: number) {
    try {
      const psychograph = new Psychograph();
      psychograph.option_value = createPsychographDto.option_value;
      psychograph.type = createPsychographDto.type;

      const savedPsychograph = await this.psychographRepository.save(psychograph);

      // Find the user
      const user = await this.userRepository.findOne({ where: { user_id } });
      // Create ActivityHistory
      const activityHistory = new ActivityHistory();
      activityHistory.user_id = user; // Assign the user entity
      activityHistory.activity = `Add new psychograph option '${savedPsychograph.option_value}' for type '${savedPsychograph.type}'`;
      // Save the ActivityHistory
      await this.activityHistoryRepository.save(activityHistory);

      return {
        status: "success",
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

  async findPsychograph(type: string): Promise<Psychograph[]> {
    try {
      const psychograph = await this.psychographRepository.find({ where: { type: type } });
      if(!psychograph){
        return null;
      }
      return psychograph;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get psychograph type '${type}'`);
    }
  }

  async findOne(psychograph_id: number): Promise<Psychograph | any> {
    return await this.psychographRepository.findOne({ where: { psychograph_id } });
  }

  async update(id: number, updatePsychographDto: UpdatePsychographDto, user_id: number) {
    const psychograph = await this.findOne(id);
    const { option_value, type } = psychograph;
    if (!psychograph) {
      throw new NotFoundException('Psychograph not found');
    }
    Object.assign(psychograph, updatePsychographDto);

    try {
      const updatedPsychograph = await this.psychographRepository.save(psychograph);

      // Find the user
      const user = await this.userRepository.findOne({ where: { user_id } });
      // Create ActivityHistory
      const activityHistory = new ActivityHistory();
      activityHistory.user_id = user; // Assign the user entity
      activityHistory.activity = `Edited psychograph option '${option_value}'->'${updatePsychographDto.option_value}' for type '${type}'`;
      // Save the ActivityHistory
      await this.activityHistoryRepository.save(activityHistory);

      return {
        status: "success",
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
        status: "success",
        message: 'Psychograph removed successfully',
        data: removedPsychograph,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove psychograph');
    }
  }
}
