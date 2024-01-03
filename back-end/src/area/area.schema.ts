import { AutoMap } from '@automapper/classes';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ActionDto, ReactionDto } from './dto/create-area.dto';

export class Area {
    @Prop({ required: true })
    @AutoMap()
    name: string;

    @Prop({ required: true })
    @AutoMap()
    description: string;

    @Prop({ required: true })
    @AutoMap()
    action: ActionDto;

    @Prop({ required: true })
    @AutoMap()
    reaction: ReactionDto;
}

export const AreaSchema = SchemaFactory.createForClass(Area);
