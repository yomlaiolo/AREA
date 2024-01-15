import { ActionDto, ReactionDto } from '../../../dto/create-area.dto';
import { ActionInterface } from '../action.interface';
import { User } from '../../../../users/user.schema';
import { CancellationToken } from '../../../../utils/cancellation_token';
import { GithubService } from '../../../../github-action/github.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../../users/users.service';
import { GDriveService } from '../../../../gdrive/gdrive.service';
import { OpenAIService } from '../../../../openai/openai.service';
import { createMapReaction, reactionConstructors } from '../../services';
import { variableObject } from 'src/utils/variable_object';
import { AreaService } from 'src/area/area.service';
import { GMailService } from 'src/gmail/gmail.service';
import { NasaService } from 'src/nasa/nasa.service';

@Injectable()
export default class ReceiveEmailAction implements ActionInterface {
  method: string = 'receive_email';
  service: string = 'google';
  description: string = "Receives an email from the user's inbox.";
  example: object = {
    from: '__from__',
    to: '__to__',
    subject: '__subject__',
    body: '__body__',
  };

  actionDto: ActionDto;
  reactionDto: ReactionDto;
  user: User;

  id: string;

  token: CancellationToken;

  first_launch: boolean;

  constructor(
    actionDto: ActionDto,
    reactionDto: ReactionDto,
    user: User,
    token: CancellationToken,
    id: string,
    first_launch: boolean,
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly gDriveService: GDriveService,
    private readonly openAiService: OpenAIService,
    private readonly areaService: AreaService,
    private readonly gmailService: GMailService,
    private readonly nasaService: NasaService,
  ) {
    this.actionDto = actionDto;
    this.reactionDto = reactionDto;
    this.user = user;
    this.token = token;
    this.id = id;
    this.first_launch = first_launch;
  }

  async exec(): Promise<void> {
    if (this.token.isCancelled) return;

    setInterval(async () => {
      if (this.token.isCancelled) return;
      if (!this.user.google || !this.user.google.access_token) return;
      const mails = await this.gmailService.receiveMail(
        this.user.google.access_token,
        this.user.email,
      );

      mails.forEach(async (mail) => {
        let from = mail.From;
        if (mail.From.includes('<')) {
          from = mail.From.substring(
            mail.From.indexOf('<') + 1,
            mail.From.indexOf('>'),
          );
        }
        const data = {
          from: from,
          to: mail.To,
          subject: mail.Subject,
          body: mail.snippet,
        };

        const reactionMap = createMapReaction(reactionConstructors);
        const reaction = reactionMap[this.reactionDto.type]
          ? new reactionMap[this.reactionDto.type](
              variableObject(
                data,
                this.actionDto.value,
                this.reactionDto.value,
              ),
              this.user,
              this.githubService,
              this.usersService,
              this.gDriveService,
              this.openAiService,
              this.gmailService,
            )
          : null;
        if (!reaction) throw new Error('Reaction not found');
        if (reaction.check()) {
          const reactionResult = await reaction.exec();
          if (reactionResult == null) return;
          const result = reactionResult.result;
          this.areaService.updateResult(this.id, result);
        } else console.log('Invalid reaction');
      });
    }, 1000);
  }

  async check(): Promise<boolean> {
    return true;
  }
}
