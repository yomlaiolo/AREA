import { ReactionInterface } from '../reaction.interface';
import { User } from '../../../../users/user.schema';
import { GithubService } from '../../../../github-action/github.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../../users/users.service';
import { GDriveService } from '../../../../gdrive/gdrive.service';
import { OpenAIService } from '../../../../openai/openai.service';
import { GMailService } from 'src/gmail/gmail.service';

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
    private readonly gmailService: GMailService,
  ) {
    this.data = data;
    this.user = user;
  }

  async exec(): Promise<object> {
    console.log(this.data.message);
    return { result: this.data.message };
  }

  async check(): Promise<boolean> {
    return true;
  }
}
