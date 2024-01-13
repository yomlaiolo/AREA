import { AutoMap } from '@automapper/classes';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    example: {
      type: 'new_pull_request',
      value: {
        repo: 'APITest',
        title: '__title__',
        body: '__body__',
        fromBranch: '__fromBranch__',
        headBranch: '__headBranch__',
      },
    },
  })
  action: ActionDto;

  @ApiProperty({
    example: {
      type: 'issue',
      value: {
        repoOwner: 'TerryMazzoni',
        repoName: 'APITest',
        title: '__fromBranch__',
        body: '__headBranch__',
      },
    },
  })
  reaction: ReactionDto;
}
