import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { ReactionInterface } from '../reaction.interface';
import { GithubService } from 'src/github-action/github.service';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';
import { GMailService } from 'src/gmail/gmail.service';

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
    private readonly gmailService: GMailService,
  ) {
    this.data = data;
    this.user = user;
  }

  async exec(): Promise<object> {
    this.githubService.createEvent(
      this.data.repoOwner,
      this.data.repoName,
      'pulls',
      this.user.github.access_token,
      {
        owner: this.data.repoOwner,
        repo: this.data.repoName,
        title: this.data.title,
        body: this.data.body,
        head: this.data.headBranch,
        base: this.data.baseBranch,
      },
    );
    return { message: 'Pull request created' };
  }

  async check(): Promise<boolean> {
    if (
      this.data.repoOwner == undefined ||
      this.data.repoName == undefined ||
      this.data.title == undefined ||
      this.data.body == undefined ||
      this.data.headBranch == undefined ||
      this.data.baseBranch == undefined
    ) {
      return false;
    }
    return true;
  }
}
