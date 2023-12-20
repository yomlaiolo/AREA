import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class LoginDto {
  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
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
