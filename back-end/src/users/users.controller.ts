import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  BadRequestException,
  Req,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, GetUserDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
import { GithubService } from 'src/github-action/github.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly githubService: GithubService,
  ) {}

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
    const user = await this.usersService.findOneByEmail(payload['user']['email']);
    if (!user) throw new BadRequestException('User not found');

    const userDto = new GetUserDto();
    userDto.username = user.username;
    userDto.email = user.email;
    userDto.id = user['_id'];
    
    userDto.google_connected = (user.google ? (await this.authService.checkGoogleTokenValidity(user.google.access_token)).valid : false);
    userDto.github_connected = (user.github ? (await this.githubService.checkTokenValidity(user.github.access_token)) : false);

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
