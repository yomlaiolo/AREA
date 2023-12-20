import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    firstname: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    is_google_oauth: boolean;

    @Prop()
    password: string;

    @Prop()
    access_token: string;

    @Prop()
    refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);