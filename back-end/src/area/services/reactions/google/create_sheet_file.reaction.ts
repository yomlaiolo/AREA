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
export default class CreateSheetReaction implements ReactionInterface {
  method: string = 'create_sheet';
  service: string = 'google';
  description: string = 'Create a sheet file in Google Drive.';
  example: object = {
    fileName: '__file__',
    fileContent: '__file_content__',
  };

  data: { fileName: string; fileContent: string };
  user: User;

  constructor(
    data: { fileName: string; fileContent: string },
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

    const result = await this.gDriveService.createGoogleSheet(
      this.data.fileName,
      this.data.fileContent,
      this.user.google.access_token,
    );

    return { result: result };
  }

  async check(): Promise<boolean> {
    return true;
  }
}
