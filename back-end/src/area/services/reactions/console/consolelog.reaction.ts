import { ReactionInterface } from '../reaction.interface';
import { User } from '../../../../users/user.schema';
import { GithubService } from '../../../../github-action/github.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export default class ConsoleLogReaction implements ReactionInterface {
  method: string = 'console_log';
  service: string = 'console';
  description: string = 'console log the message. This is useful for debugging';
  example: object = {
    message: '__message__',
  };

  data: { message: string };
  user: User;

  constructor(
    data: { message: string },
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
    console.log(this.data['value'].message);
  }

  async check(): Promise<boolean> {
    return true;
  }
}
