import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";

export class CreateUserDto {
    @ApiProperty()
    @AutoMap()
    username: string;

    @ApiProperty()
    @AutoMap()
    firstname: string;

    @ApiProperty()
    @AutoMap()
    lastname: string;

    @ApiProperty()
    @AutoMap()
    email: string;

    @ApiProperty()
    @AutoMap()
    password: string;
}

export class GetUserDto {
    @ApiProperty()
    @AutoMap()
    username: string;

    @ApiProperty()
    @AutoMap()
    firstname: string;

    @ApiProperty()
    @AutoMap()
    lastname: string;

    @ApiProperty()
    @AutoMap()
    email: string;

    @ApiProperty()
    @AutoMap()
    id: string;
}
