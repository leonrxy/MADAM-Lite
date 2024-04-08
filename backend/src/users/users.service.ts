import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:
      Repository<User>
  ) {

  }
  async create(createUserDto: CreateUserDto) {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }
    try {
      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepository.save({ ...userData, password: hashedPassword });
      return {
        status: "success",
        message: 'User created successfully',
        data: newUser
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(user_id: number) {
    return await this.userRepository.findOne({ where: { user_id } });
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(user_id);
    if (!user) {
      throw new NotFoundException;
    }

    try {
      const { password, ...userData } = updateUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateUser = { ...userData, password: hashedPassword };
      Object.assign(user, updateUser);
      console.log(user)
      const updatedUser = await this.userRepository.save(user);
      return {
        status: "success",
        message: 'User updated successfully',
        data: updatedUser
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException;
    }
    try {
      const removedUser = await this.userRepository.remove(user);
      return {
        status: "success",
        message: 'User removed successfully',
        data: removedUser
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove user');
    }
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async changePassword(user_id: number, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      // Hash kata sandi baru
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update kata sandi pengguna dan simpan perubahan
      user.password = hashedPassword;
      await this.userRepository.save(user);
      return await { status: "success", message: 'Password changed successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to change password user');
    }
  }
}
