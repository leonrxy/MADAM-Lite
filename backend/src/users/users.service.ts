import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      // Validate DTO
      const errors = await validate(createUserDto);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
      const findusername = await this.userRepository.findOne({ where: { username: createUserDto.username } });
      if (findusername) {
        throw new NotFoundException('Username is already taken');
      }
      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userRepository.save({ ...userData, password: hashedPassword });
      return { message: 'User created successfully', data: newUser };
    } catch (error) {
      const errorMessage = 'Unable to create user. Please try again later.';
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(user_id: number) {
    return await this.userRepository.findOne({ where: { user_id } });
  }

  async update(user_id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(user_id);
    if (!user) {
      throw new NotFoundException;
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException;
    }
    return await this.userRepository.remove(user);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async changePassword(user_id: number, newPassword: string) {
    try {
      // Dapatkan pengguna dari database berdasarkan ID
      const user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Hash kata sandi baru
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update kata sandi pengguna dan simpan perubahan
      user.password = hashedPassword;
      await this.userRepository.save(user);
      return await { status: "success", message: 'Password changed successfully' };
    } catch (error) {
      // Tangani kesalahan dengan mengembalikan pesan kesalahan yang sesuai
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException('Failed to change password', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
