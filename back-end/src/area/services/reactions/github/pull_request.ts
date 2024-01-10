import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { ReactionInterface } from '../reaction.interface';
import { GithubService } from 'src/github-action/github.service';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export default class PullRequestReaction implements ReactionInterface {
  method: string = 'pull_request';
  service: string = 'github';
  description: string = 'create a pull request on github';
  example: object = {
    repoOwner: 'myUsername',
    repoName: 'myRepository',
    title: 'awesome title',
    body: 'basic body',
    headBranch: 'dev',
    baseBranch: 'main',
  };

  data: {
    repoOwner: string;
    repoName: string;
    title: string;
    body: string;
    headBranch: string;
    baseBranch: string;
  };
  user: User;

  constructor(
    data: {
      repoOwner: string;
      repoName: string;
      title: string;
      body: string;
      headBranch: string;
      baseBranch: string;
    },
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
      'pulls',
      this.user.github.access_token,
      {
        owner: this.data['value'].repoOwner,
        repo: this.data['value'].repoName,
        title: this.data['value'].title,
        body: this.data['value'].body,
        head: this.data['value'].headBranch,
        base: this.data['value'].baseBranch,
      },
    );
  }

  async check(): Promise<boolean> {
    if (
      this.data['value'].repoOwner == undefined ||
      this.data['value'].repoName == undefined ||
      this.data['value'].title == undefined ||
      this.data['value'].body == undefined ||
      this.data['value'].headBranch == undefined ||
      this.data['value'].baseBranch == undefined
    ) {
      return false;
    }
    return true;
  }
}
