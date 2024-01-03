import { AutoMap } from "@automapper/classes";
import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class ActionDto {
  @ApiProperty()
  type: string;

  @ApiProperty({ default: null })
  value: string | number | boolean | object;
}

export class ReactionDto {
  @ApiProperty()
  type: string;

  @ApiProperty({ default: null })
  value: string | number | boolean | object;
}

export class CreateAreaDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  action: ActionDto;

  @ApiProperty()
  reaction: ReactionDto;
}
