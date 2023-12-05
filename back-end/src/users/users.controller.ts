import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: User) {
    return this.usersService.create(userDto);
  }

  @Delete(':id')
  async findAll() {
    return this.usersService.findAll();
  }
}
