import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { ReactionInterface } from '../reaction.interface';
import { GithubService } from 'src/github-action/github.service';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export default class IssueReaction implements ReactionInterface {
  method: string = 'issue';
  service: string = 'github';
  description: string = 'create an issue on github';
  example: object = {
    repoOwner: 'myUsername',
    repoName: 'myRepository',
    title: 'awesome title',
    body: 'basic body',
  };

  data: { repoOwner: string; repoName: string; title: string; body: string };
  user: User;

  constructor(
    data: { repoOwner: string; repoName: string; title: string; body: string },
    user: User,
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly gDriveService: GDriveService,
    private readonly openAiService: OpenAIService,
  ) {
    this.data = data;
    this.user = user;
  }

  async exec(): Promise<void> {
    this.githubService.createEvent(
      this.data['value'].repoOwner,
      this.data['value'].repoName,
      'issues',
      this.user.github.access_token,
      {
        title: this.data.title,
        body: this.data.body,
      },
    );
  }

  async check(): Promise<boolean> {
    if (
      this.data['value'].repoOwner == undefined ||
      this.data['value'].repoName == undefined ||
      this.data['value'].title == undefined ||
      this.data['value'].body == undefined
    ) {
      return false;
    }
    return true;
  }
}
