import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class CronDto {
  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  frequency: string;
}
