import { Controller, Get, Post, Body, Patch, Param, Delete, /*UseGuards*/ } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
//@UseGuards(new JwtAuthGuard(['superadmin']))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id/change-password') // Rute untuk mengganti password
  async changePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
    // Panggil fungsi untuk mengganti password dari UsersService
    return this.usersService.changePassword(+id, changePasswordDto.new_password);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  
}
