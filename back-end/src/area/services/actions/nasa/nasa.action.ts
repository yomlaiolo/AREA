import { variableObject } from '../../../../utils/variable_object';
import { CancellationToken } from '../../../../utils/cancellation_token';
import { User } from 'src/users/user.schema';
import { GithubService } from 'src/github-action/github.service';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { createMapReaction, reactionConstructors } from '../../services';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';
import { ActionDto, ReactionDto } from 'src/area/dto/create-area.dto';
import { factoryArea } from '../../services';
import { ActionInterface } from '../action.interface';
import { AreaService } from 'src/area/area.service';
import { GMailService } from 'src/gmail/gmail.service';
import { NasaService } from 'src/nasa/nasa.service';

export default class NasaAction implements ActionInterface {
  method: string = 'nasa';
  service: string = 'nasa';
  description: string = 'On nasa picture of the day, calls the reaction';
  example: object = {
    url: 'https://apod.nasa.gov/apod/image/2103/NGC1499_LDN1622_HaO3RGB1024.jpg',
  };

  actionDto: ActionDto;
  reactionDto: ReactionDto;
  user: User;

  id: string;

  token: CancellationToken;

  first_launch: boolean;

  cron = require('node-cron');

  url: string;

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
    setInterval(async () => {
      if (this.token.isCancelled) return;
      this.nasaService.getPicturesOfTheDay().subscribe(
        async (url) => {
          if (!url) throw new Error('No url found');
          if (this.url == url) return;
          this.url = url;
          const data = {
            url: this.url,
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
                this.nasaService,
              )
            : null;
          if (!reaction) throw new Error('Reaction not found');
          if (reaction.check()) {
            const reactionResult = await reaction.exec();

            const result = reactionResult.result;
            this.areaService.updateResult(this.id, result);
          } else console.log('Invalid reaction');
        },
        (err) => {
          console.log(err);
        },
      );
    }, 3600000);
  }

  async check(): Promise<boolean> {
    if (this.actionDto.value['url'] == undefined) {
      return false;
    }
    return true;
  }
}
