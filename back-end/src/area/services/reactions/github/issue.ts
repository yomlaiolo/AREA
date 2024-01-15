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
    repoName: 'myRepository',
    title: 'awesome title',
    body: 'basic body',
  };

  data: { repoName: string; title: string; body: string };
  user: User;

  constructor(
    data: { repoName: string; title: string; body: string },
    user: User,
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly gDriveService: GDriveService,
    private readonly openAiService: OpenAIService,
  ) {
    this.data = data;
    this.user = user;
  }

  async exec(): Promise<object> {
    this.githubService.createEvent(
      this.user.github.username,
      this.data.repoName,
      'issues',
      this.user.github.access_token,
      {
        title: this.data.title,
        body: this.data.body,
      },
    );
    return { message: 'Issue created' };
  }

  async check(): Promise<boolean> {
    if (
      this.data.repoName == undefined ||
      this.data.title == undefined ||
      this.data.body == undefined
    ) {
      return false;
    }
    return true;
  }
}
