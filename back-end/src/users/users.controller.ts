import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, GetUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid token' })
  @ApiResponse({
    status: 200,
    description: 'OK - Information about the curent user (according to token)',
    type: GetUserDto,
  })
  @ApiTags('users')
  async getUser(@Req() request: Request): Promise<GetUserDto> {
    const payload = request['user'];
    const user = await this.usersService.findOneById(payload['user']['_id']);
    if (!user) throw new BadRequestException('User not found');

    const userDto = new GetUserDto();
    userDto.username = user.username;
    userDto.email = user.email;
    userDto.id = user['_id'];

    return userDto;
  }

  @Get('all')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid token' })
  @ApiResponse({
    status: 200,
    description: 'OK - Get all users',
    isArray: true,
    type: GetUserDto,
  })
  @ApiTags('users')
  async findAll() {
    return this.usersService.findAll();
  }

  @Delete('all')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid token' })
  @ApiResponse({
    status: 200,
    description: 'OK - Delete all users',
  })
  @ApiTags('users')
  async deleteAll() {
    return this.usersService.deleteAll();
  }
}
