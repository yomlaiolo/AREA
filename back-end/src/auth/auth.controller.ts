import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse, RegisterDto } from './auth.dto';
import { CreateUserDto, GetUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { AutoMap } from '@automapper/classes';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'OK - User logged in',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid credentials',
  })
  @ApiBody({
    type: LoginDto,
  })
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'CREATED - User created',
    type: RegisterDto,
  })
  @ApiResponse({
    status: 409,
    description: 'CONFLICT - User already exists',
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST - Missing fields required for user creation',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - invalid data',
  })
  @ApiResponse({
    status: 406,
    description: 'Not Acceptable - invalid email / password',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - user already exists',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiTags('auth')
  async signUp(@Body() userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto);
    return { id: user['_id'] };
  }
}
