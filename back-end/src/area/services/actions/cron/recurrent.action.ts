import { ActionDto, ReactionDto } from '../../../dto/create-area.dto';
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
export default class RecurrentAction implements ActionInterface {
  method: string = 'recurrent';
  service: string = 'cron';
  description: string = 'Calls the reaction according to the cron expression.';
  example: object = {
    cron: '0 14 * * * *',
  };

  actionDto: ActionDto;
  reactionDto: ReactionDto;
  user: User;

  token: CancellationToken;

  cron = require('node-cron');

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
      cron: this.actionDto.value['cron'],
    };
    this.cron.schedule(data.cron, () => {
      if (this.token.isCancelled) return;
      const reactionMap = createMapReaction(reactionConstructors);
      const reaction = reactionMap[this.reactionDto.type]
        ? new reactionMap[this.reactionDto.type](
            variableObject(data, this.actionDto.value, this.reactionDto.value),
            this.user,
            this.githubService,
            this.usersService,
            this.gDriveService,
            this.openAiService,
          )
        : null;
      if (!reaction || !reaction.check()) {
        console.log('Invalid reaction');
        return;
      }
      reaction.exec();
    });
  }

  async check(): Promise<boolean> {
    try {
      this.cron.validate(this.actionDto.value['cron']);
    } catch (e) {
      console.log('Invalid cron expression');
      return false;
    }

    if (this.actionDto.value['cron'] == undefined) {
      return false;
    }
    return true;
  }
}
