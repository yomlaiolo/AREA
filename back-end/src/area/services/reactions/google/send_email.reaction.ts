import { ReactionInterface } from '../reaction.interface';
import { User } from '../../../../users/user.schema';
import { GithubService } from '../../../../github-action/github.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';

@Injectable()
export default class ConsoleLogReaction implements ReactionInterface {
  method: string = 'send_email';
  service: string = 'google';
  description: string = "Sends an email to the user's inbox.";
  example: object = {
    to: '__to__',
    cc: '__cc__',
    subject: '__subject__',
    body: '__body__',
  };

  data: { to: string; cc: string[]; subject: string; body: string };
  user: User;
  
  constructor(
    data: { to: string; cc: string[]; subject: string; body: string },
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
    console.log("Send email", this.data);
  }

  async check(): Promise<boolean> {
    return true;
  }
}
