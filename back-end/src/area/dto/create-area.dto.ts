import { AutoMap } from "@automapper/classes";
import { Prop } from "@nestjs/mongoose";
import e from "express";

export class ActionDto {
  @Prop({ required: true })
  @AutoMap()
  type: string;

  @Prop()
  @AutoMap()
  value: string | number | boolean | object;
}

export class ReactionDto {
  @Prop({ required: true })
  @AutoMap()
  type: string;

  @Prop({ required: false })
  @AutoMap()
  value: string | number | boolean | object;
}

export class CreateAreaDto {
  @Prop({ required: true })
  @AutoMap()
  action: ActionDto;

  @Prop({ required: true })
  @AutoMap()
  reaction: ReactionDto;
}
