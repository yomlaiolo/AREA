import { AutoMap } from "@automapper/classes";
import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class ActionDto {
  @ApiProperty()
  type: string;

  @ApiProperty({ default: null })
  value: object;
}

export class ReactionDto {
  @ApiProperty()
  type: string;

  @ApiProperty({ default: null })
  value: object;
}

export class CreateAreaDto {
  @ApiProperty({ example: 'My area' })
  name: string;

  @ApiProperty({ example: 'My area description' })
  description: string;

  @ApiProperty({ example: { type: "interval", value: { interval: 1000 } } })
  action: ActionDto;

  @ApiProperty({ example: { type: "print", value: { message: "Hello World!" } } })
  reaction: ReactionDto;
}
