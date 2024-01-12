import { variableObject } from '../../../../utils/variable_object';
import { CancellationToken } from '../../../../utils/cancellation_token';
import { User } from 'src/users/user.schema';
import { GithubService } from 'src/github-action/github.service';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';
import { ActionDto, ReactionDto } from 'src/area/dto/create-area.dto';
import { factoryArea } from '../../services';
import { ActionInterface } from '../action.interface';

export default class PullRequestAction implements ActionInterface {
  method: string = 'new_pull_request';
  service: string = 'github';
  description: string = 'Calls the reaction when a new pull request is created.';
  example: object = {
    repo: 'myRepository',
    title: 'pull request title',
    body: 'pull request body',
    fromBranch: 'dev',
    headBranch: 'master',
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
      repo: this.actionDto.value['repo'],
      title: this.actionDto.value['title'],
      body: this.actionDto.value['body'],
      fromBranch: this.actionDto.value['fromBranch'],
      headBranch: this.actionDto.value['headBranch'],
    };

    const webhookUUID = uuidv4();

    this.githubService.subscribeToRepo(
      this.user.github.username,
      data.repo,
      this.user.github.access_token,
      ['pull_request'],
      webhookUUID,
    );

    this.usersService.addWebhookUUID(
      this.user.github.username,
      data.repo,
      webhookUUID,
    );

    this.usersService.addWebhookReaction(
      this.user.github.username,
      data.repo,
      this.reactionDto.type,
      this.actionDto,
      this.reactionDto,
    );
    // call the reaction function with the data
    // reactionFunc(variableObject(data, actionData, reactionData));
  }

  async check(): Promise<boolean> {
    if (
      this.actionDto.value['repo'] == undefined ||
      this.actionDto.value['title'] == undefined ||
      this.actionDto.value['body'] == undefined ||
      this.actionDto.value['fromBranch'] == undefined ||
      this.actionDto.value['headBranch'] == undefined
    ) {
      return false;
    }
    return true;
  }
}
