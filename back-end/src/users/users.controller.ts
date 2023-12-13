import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { Public } from '../auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async create(@Body() userDto: User) {
    return this.usersService.create(userDto);
  }

  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @Delete('all')
  async deleteAll() {
    return this.usersService.deleteAll();
  }
}
