import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  NotAcceptableException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginDto,
  LoginResponse,
  RegisterDto,
  GoogleDto,
  ChangePasswordDto,
  ChangeUsernameOrEmailDto,
  AccessTokenDto,
} from './auth.dto';
import { CreateUserDto, GetUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { AutoMap } from '@automapper/classes';
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';

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
  async signIn(@Body() loginDto: LoginDto): Promise<LoginResponse> {
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
  async signUp(@Body() userDto: CreateUserDto): Promise<RegisterDto> {
    userDto.is_google_oauth = false;
    const user = await this.usersService.create(userDto);
    return { id: user['_id'] };
  }

  @HttpCode(HttpStatus.OK)
  @ApiTags('auth')
  @Post('change-password')
  @ApiResponse({
    status: 200,
    description: 'OK - Password changed',
  })
  @ApiResponse({
    status: 401,
    description: 'UNAUTHORIZED - Invalid token / Invalid password',
  })
  @ApiResponse({
    status: 400,
    description: 'BAD REQUEST - Missing fields required for password change',
  })
  @ApiResponse({
    status: 406,
    description:
      'NOT ACCEPTABLE - Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number',
  })
  @ApiBearerAuth('access-token')
  async changePassword(
    @Body() ChangePasswordDto: ChangePasswordDto,
    @Req() request: Request,
  ): Promise<void> {
    const userId = request['user'].user['_id'];
    if (
      ChangePasswordDto.new_password == undefined ||
      ChangePasswordDto.old_password == undefined
    )
      throw new BadRequestException(
        'Missing fields required for password change',
      );
    return this.authService.changePassword(
      userId,
      ChangePasswordDto.old_password,
      ChangePasswordDto.new_password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiTags('auth')
  @Post('change-profile')
  @ApiResponse({
    status: 200,
    description: 'OK - Username / email changed',
  })
  @ApiResponse({
    status: 401,
    description: 'UNAUTHORIZED - Invalid token',
  })
  @ApiResponse({
    status: 400,
    description:
      'BAD REQUEST - Password is required / Username or email is required',
  })
  @ApiResponse({
    status: 406,
    description: 'NOT ACCEPTABLE - Email is not valid',
  })
  @ApiResponse({
    status: 409,
    description: 'CONFLICT - Username or email already in use',
  })
  @ApiBearerAuth('access-token')
  async changeUsernameOrEmail(
    @Body() changeUsernameOrEmailDto: ChangeUsernameOrEmailDto,
    @Req() request: Request,
  ): Promise<void> {
    const userByEmail = await this.usersService.findOneByEmail(
      changeUsernameOrEmailDto.email,
    );
    const userByUsername = await this.usersService.findOneByUsername(
      changeUsernameOrEmailDto.username,
    );

    if (
      (userByEmail != undefined &&
        userByEmail['_id'] != request['user'].user['_id']) ||
      (userByUsername != undefined &&
        userByUsername['_id'] != request['user'].user['_id'])
    )
      throw new ConflictException('Username or email already in use');
    if (changeUsernameOrEmailDto.password == undefined)
      throw new BadRequestException('Password is required');
    if (
      changeUsernameOrEmailDto.username == undefined &&
      changeUsernameOrEmailDto.email == undefined
    )
      throw new BadRequestException('Username or email is required');
    const userId = request['user'].user['_id'];
    return this.authService.changeUsernameOrEmail(
      userId,
      changeUsernameOrEmailDto,
    );
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

    if (user) {
      // Login user
      if (user.is_google_oauth == false)
        throw new ConflictException('User not registered with Google');
      access_token = user.google.access_token;

      const validityGoogle =
        await this.authService.checkGoogleTokenValidity(access_token);
      if (!validityGoogle.valid)
        user.google.access_token = await this.authService.getGoogleTokens(
          googleDto.server_auth_code,
        )['access_token'];

      const payload = { user };
      const token = await this.authService.getJwt(payload);
      user.google.access_token = token;
      await this.usersService.updateAcessToken(user['_id'], token);
      return {
        access_token: token,
      };
    }
    const newUser = new CreateUserDto();
    // Create user
    const tokens: object = await this.authService.getGoogleTokens(
      googleDto.server_auth_code,
    );

    newUser.username = googleDto.user.name;
    newUser.email = googleDto.user.email;
    newUser.password = undefined;
    newUser.is_google_oauth = true;
    newUser.photo = googleDto.user.photo;
    newUser.google = {
      access_token: tokens['access_token'],
      refresh_token: tokens['refresh_token'],
      id_token: googleDto.id_token,
      username: googleDto.user.name,
    };

    const createdUser = await this.usersService.create(newUser);
    const payload = { user: createdUser };
    const token = await this.authService.getJwt(payload);
    return {
      access_token: token,
    };
  }

  @Public()
  @Post('google-access-token')
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
  @ApiBody({ type: AccessTokenDto })
  async googleAccessToken(
    @Body() accessTokenDto: AccessTokenDto,
  ): Promise<LoginResponse> {
    const access_token = accessTokenDto.access_token;
    const userInfo = await this.authService.getGoogleUserInfo(access_token);

    const email = userInfo.email;
    let user = await this.usersService.findOneByEmail(email);

    if (user) {
      // Login user
      if (user.is_google_oauth == false)
        throw new ConflictException('User not registered with Google');

      const payload = { user };
      const token = await this.authService.getJwt(payload);
      return {
        access_token: token,
      };
    }

    // Create user
    const newUser = new CreateUserDto();
    newUser.username = userInfo.name;
    newUser.email = userInfo.email;
    newUser.password = undefined;
    newUser.is_google_oauth = true;
    newUser.photo = userInfo.picture;
    newUser.google = {
      access_token: access_token,
      refresh_token: null,
      id_token: null,
      username: userInfo.name,
    };

    const createdUser = await this.usersService.create(newUser);
    const payload = { user: createdUser };
    const token = await this.authService.getJwt(payload);
    return {
      access_token: token,
    };
  }
}
