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
export default class ResumeTextReaction implements ReactionInterface {
  method: string = 'resume_text';
  service: string = 'openai';
  description: string = 'Resume the message with openai.';
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
    private readonly nasaService: NasaService,
  ) {
    this.data = data;
    this.user = user;
  }

  async exec(): Promise<object> {
    if (this.data['error']) {
      return null;
    }

    const resume = await this.openAiService.ResumeEmail(
      this.data.message,
      process.env.OPENAI_KEY,
      'french',
    );
    return { result: resume };
  }

  async check(): Promise<boolean> {
    return true;
  }
}
