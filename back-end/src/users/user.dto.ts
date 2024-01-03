import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";

export class CreateUserDto {
    @ApiProperty({ example: "username" })
    @AutoMap()
    username: string;

    @ApiProperty({ example: "email@gmail.com" })
    @AutoMap()
    email: string;

    @ApiProperty({ example: "Passw0rd" })
    @AutoMap()
    password: string;

    @ApiProperty({ example: false })
    @AutoMap()
    is_google_oauth: boolean;

    @ApiProperty({ example: null })
    @AutoMap()
    photo: string;

    @ApiProperty({ example: null })
    @AutoMap()
    id_token: string;

    @ApiProperty({ example: null })
    @AutoMap()
    access_token: string;

    @ApiProperty({ example: null })
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
