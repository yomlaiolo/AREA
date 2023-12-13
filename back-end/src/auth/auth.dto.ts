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
