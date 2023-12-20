import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse, RegisterDto, GoogleDto } from './auth.dto';
import { CreateUserDto, GetUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { AutoMap } from '@automapper/classes';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

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
    userDto.is_google_oauth = false;
    const user = await this.usersService.create(userDto);
    return { id: user['_id'] };
  }

  @Public()
  @Post('google')
  @ApiResponse({
    status: 200,
    description: 'OK - User logged in',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'UNAUTHORIZED - Invalid token',
  })
  @ApiResponse({
    status: 409,
    description: 'CONFLICT - User not registered with Google',
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST - User not registered with Google',
  })
  @ApiTags('auth')
  @HttpCode(HttpStatus.OK)
  async google(@Body() googleDto: GoogleDto): Promise<LoginResponse> {
    const email = googleDto.user.email;
    let access_token = undefined;
    const user = await this.usersService.findOneByEmail(email);

    if (user) { // Login user
      if (user.is_google_oauth == false)
        throw new ConflictException('User not registered with Google');
      access_token = user.access_token;

      const validityGoogle = await this.authService.checkGoogleTokenValidity(access_token);
      if (!validityGoogle.valid)
        user.access_token = await this.authService.getGoogleTokens(
          googleDto.server_auth_code)['access_token']

      const payload = { user };
      const token = await this.authService.getJwt(payload);
      return {
        access_token: token,
      };
    }
    const newUser = new CreateUserDto();
    // Create user
    const tokens: object = await this.authService.getGoogleTokens(
      googleDto.server_auth_code
    );
    
    newUser.username = googleDto.user.name;
    newUser.firstname = googleDto.user.givenName;
    newUser.lastname = googleDto.user.familyName;
    newUser.email = googleDto.user.email;
    newUser.password = undefined;
    newUser.is_google_oauth = true;
    newUser.photo = googleDto.user.photo;
    newUser.id_token = googleDto.id_token;
    newUser.access_token = tokens['access_token'];
    newUser.refresh_token = tokens['refresh_token'];
    const createdUser = await this.usersService.create(newUser);
    const payload = { user: createdUser };
    const token = await this.authService.getJwt(payload);
    return {
      access_token: token,
    };
  }
}
