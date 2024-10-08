import { ReactionInterface } from '../reaction.interface';
import { User } from '../../../../users/user.schema';
import { GithubService } from '../../../../github-action/github.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';
import { GMailService } from 'src/gmail/gmail.service';
import { NasaService } from 'src/nasa/nasa.service';

@Injectable()
export default class SendEmailReaction implements ReactionInterface {
  method: string = 'send_email';
  service: string = 'google';
  description: string = "Sends an email to the user's inbox.";
  example: object = {
    to: '__to__',
    subject: '__subject__',
    body: '__body__',
  };

  data: { to: string; subject: string; body: string };
  user: User;

  constructor(
    data: { to: string; subject: string; body: string },
    user: User,
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly gDriveService: GDriveService,
    private readonly openAiService: OpenAIService,
    private readonly gmailService: GMailService,
    private readonly nasaService: NasaService,
  ) {
    this.data = data;
    this.user = user;
  }

  async exec(): Promise<object> {
    if (this.data['error']) {
      return null;
    }
    this.gmailService.sendEmail(
      this.data.to,
      '',
      this.data.subject,
      this.data.body,
      this.user.google.access_token,
    );

    return { result: this.data.body };
  }

  async check(): Promise<boolean> {
    return true;
  }
}
