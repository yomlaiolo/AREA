import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class GithubTokenDto {
  @ApiProperty()
  @AutoMap()
  token: string;
}

export class RepoSettingsDto {
  @ApiProperty()
  @AutoMap()
  repoName: string;

  @ApiProperty()
  @AutoMap()
  eventsList: string[] | undefined;
}
