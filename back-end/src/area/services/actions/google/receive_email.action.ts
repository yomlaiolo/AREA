import { ActionDto, ReactionDto } from '../../../dto/create-area.dto';
import { ActionInterface } from '../action.interface';
import { User } from '../../../../users/user.schema';
import { CancellationToken } from '../../../../utils/cancellation_token';
import { GithubService } from '../../../../github-action/github.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../../users/users.service';
import { GDriveService } from '../../../../gdrive/gdrive.service';
import { OpenAIService } from '../../../../openai/openai.service';

@Injectable()
export default class ReceiveEmailAction implements ActionInterface {
  method: string = 'receive_email';
  service: string = 'google';
  description: string = "Receives an email from the user's inbox.";
  example: object = {
    from: '__from__',
    cc: '__cc__',
    to: '__to__',
    subject: '__subject__',
  };

  actionDto: ActionDto;
  reactionDto: ReactionDto;
  user: User;

  id: string;

  token: CancellationToken;

  constructor(
    actionDto: ActionDto,
    reactionDto: ReactionDto,
    user: User,
    token: CancellationToken,
    id: string,
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly gDriveService: GDriveService,
    private readonly openAiService: OpenAIService,
  ) {
    this.actionDto = actionDto;
    this.reactionDto = reactionDto;
    this.user = user;
    this.token = token;
    this.id = id;
  }

  async exec(): Promise<void> {
    const data = {
      from: '',
      cc: [],
      to: '',
      subject: '',
    };

    // if (this.token.isCancelled) return;
    // const reactionMap = createMapReaction(reactionConstructors);
    // const reaction = reactionMap[this.reactionDto.type]
    //   ? new reactionMap[this.reactionDto.type](
    //       variableObject(data, this.actionDto.value, this.reactionDto.value),
    //       this.user,
    //       this.id,
    //       this.githubService,
    //       this.usersService,
    //       this.gDriveService,
    //       this.openAiService,
    //     )
    //   : null;
    // if (!reaction || !reaction.check()) {
    //   console.log('Invalid reaction');
    //   return;
    // }
    // reaction.exec();
  }

  async check(): Promise<boolean> {
    return true;
  }
}
