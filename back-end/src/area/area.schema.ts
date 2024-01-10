import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ActionDto, ReactionDto } from './dto/create-area.dto';

@Schema()
export class Area {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  action: ActionDto;

  @Prop({ required: true })
  reaction: ReactionDto;

  @Prop()
  user_id: string;

  @Prop({ default: true })
  first_launch: boolean;
}

export const AreaSchema = SchemaFactory.createForClass(Area);
