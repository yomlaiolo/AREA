import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './auth.dto';
import { CreateUserDto, GetUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { AutoMap } from "@automapper/classes";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'OK - User logged in',
    type: LoginResponse,
  })
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @Public()
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'CREATED - User created',
    type: GetUserDto,
  })
  @ApiTags('auth')
  async signUp(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }
}
