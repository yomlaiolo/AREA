import { ActionDto, ReactionDto } from '../../../../area/dto/create-area.dto';
import { ActionInterface } from '../action.interface';
import { User } from '../../../../users/user.schema';
import { CancellationToken } from '../../../../utils/cancellation_token';
import { GithubService } from '../../../../github-action/github.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';
import { createMapReaction, reactionConstructors } from '../../services';
import { variableObject } from 'src/utils/variable_object';

@Injectable()
export default class IntervalAction implements ActionInterface {
  method: string = 'interval';
  service: string = 'cron';
  description: string = 'Calls the reaction every interval of time.';
  example: object = {
    hour: 14,
    minute: 30,
  };

  actionDto: ActionDto;
  reactionDto: ReactionDto;
  user: User;

  token: CancellationToken;

  constructor(
    actionDto: ActionDto,
    reactionDto: ReactionDto,
    user: User,
    token: CancellationToken,
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly gDriveService: GDriveService,
    private readonly openAiService: OpenAIService,
  ) {
    this.actionDto = actionDto;
    this.reactionDto = reactionDto;
    this.user = user;
    this.token = token;
  }

  async exec(): Promise<void> {
    const data = {
      minute: this.actionDto.value['minute'],
      hour: this.actionDto.value['hour'],
    };
    setInterval(
      () => {
        if (this.token.isCancelled) return;
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
            )
          : null;
        if (!reaction) throw new Error('Reaction not found');
        if (reaction.check()) reaction.exec();
        else console.log('Invalid reaction');
      },
      1000 * 60 * (60 * data.hour + data.minute),
    );
  }

  async check(): Promise<boolean> {
    if (
      !this.actionDto.value ||
      this.actionDto.value['hour'] == undefined ||
      this.actionDto.value['minute'] == undefined ||
      this.actionDto.value['hour'] < 0 ||
      this.actionDto.value['hour'] > 23 ||
      this.actionDto.value['minute'] < 0 ||
      this.actionDto.value['minute'] > 59
    )
      return false;
    return true;
  }
}
