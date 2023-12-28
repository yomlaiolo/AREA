import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";

export class CreateUserDto {
    @ApiProperty()
    @AutoMap()
    username: string;

    @ApiProperty()
    @AutoMap()
    email: string;

    @ApiProperty()
    @AutoMap()
    password: string;

    @ApiProperty()
    @AutoMap()
    is_google_oauth: boolean;

    @ApiProperty()
    @AutoMap()
    photo: string;

    @ApiProperty()
    @AutoMap()
    id_token: string;

    @ApiProperty()
    @AutoMap()
    access_token: string;

    @ApiProperty()
    @AutoMap()
    refresh_token: string;
}

export class GetUserDto {
    @ApiProperty()
    @AutoMap()
    username: string;

    @ApiProperty()
    @AutoMap()
    email: string;

    @ApiProperty()
    @AutoMap()
    id: string;
}
