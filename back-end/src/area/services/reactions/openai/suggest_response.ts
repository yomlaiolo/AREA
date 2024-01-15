import { ReactionInterface } from '../reaction.interface';
import { User } from '../../../../users/user.schema';
import { GithubService } from '../../../../github-action/github.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';
import { GMailService } from 'src/gmail/gmail.service';

@Injectable()
export default class SuggestResponseReaction implements ReactionInterface {
  method: string = 'suggest_response';
  service: string = 'openai';
  description: string = 'Suggest a response to the message with openai.';
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
    if (this.data['error']) {
      return null;
    }

    const resume = await this.openAiService.SuggestEmailResponse(
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
