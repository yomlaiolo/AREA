import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class LoginDto {
  @ApiProperty({ example: "email@gmail.com" })
  @AutoMap()
  email: string;

  @ApiProperty({ example: "Passw0rd" })
  @AutoMap()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  @AutoMap()
  access_token: string;
}

export class RegisterDto {
  @ApiProperty()
  @AutoMap()
  id: string;
}

export class GoogleUser {
  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
  @AutoMap()
  familyName: string;

  @ApiProperty()
  @AutoMap()
  givenName: string;

  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  photo: string;
}

export class GoogleDto {
  @ApiProperty()
  @AutoMap()
  user: GoogleUser;

  @ApiProperty()
  @AutoMap()
  server_auth_code: string;

  @ApiProperty()
  @AutoMap()
  id_token: string;
}

export class AccessTokenDto {
  @ApiProperty()
  @AutoMap()
  access_token: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @AutoMap()
  old_password: string;

  @ApiProperty()
  @AutoMap()
  new_password: string;
}

export class ChangeUsernameOrEmailDto {
  @ApiProperty()
  @AutoMap()
  password: string;

  @ApiProperty()
  @AutoMap()
  username: string;

  @ApiProperty()
  @AutoMap()
  email: string;
}
