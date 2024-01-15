import { User } from 'src/users/user.schema';
import { ActionDto, ReactionDto } from '../dto/create-area.dto';
import { ActionInterface } from './actions/action.interface';
import { ReactionInterface } from './reactions/reaction.interface';
import { CancellationToken } from 'src/utils/cancellation_token';
import { GithubService } from 'src/github-action/github.service';
import { UsersService } from 'src/users/users.service';
import { GDriveService } from 'src/gdrive/gdrive.service';
import { OpenAIService } from 'src/openai/openai.service';
import { NasaService } from 'src/nasa/nasa.service';
import { AreaService } from '../area.service';

// Actions ####################################################################
// cron
import IntervalAction from './actions/cron/interval.action';
import RecurrentAction from './actions/cron/recurrent.action';
// google
import ReceiveEmailAction from './actions/google/receive_email.action';
// github
import PullRequestAction from './actions/github/new_pull_request';
import IssueAction from './actions/github/new_issue';
// nasa
import NasaAction from './actions/nasa/nasa.action';

// Reactions ##################################################################
// console
import ConsoleLogReaction from './reactions/console/consolelog.reaction';
import IssueReaction from './reactions/github/issue';
import { GMailService } from 'src/gmail/gmail.service';
import SendEmailReaction from './reactions/google/send_email.reaction';
import ResumeTextReaction from './reactions/openai/resume_text';
import SuggestResponseReaction from './reactions/openai/suggest_response';
import PullRequestReaction from './reactions/github/pull_request';

export const actionConstructors: (new (
  actionDto: ActionDto,
  reactionDto: ReactionDto,
  user: object,
  token: object,
  id: string,
  first_launch: boolean,
  githubService: GithubService,
  usersService: UsersService,
  gDriveService: GDriveService,
  openAiService: OpenAIService,
  areaService: AreaService,
  gmailService: GMailService,
  nasaService: NasaService,
) => ActionInterface)[] = [
  IntervalAction,
  IssueAction,
  PullRequestAction,
  RecurrentAction,
  ReceiveEmailAction,
  NasaAction,
];

export const reactionConstructors: (new (
  data: object,
  user: User,
  githubService: GithubService,
  usersService: UsersService,
  gDriveService: GDriveService,
  openAiService: OpenAIService,
  gmailService: GMailService,
  nasaService: NasaService,
) => ReactionInterface)[] = [
  ConsoleLogReaction,
  IssueReaction,
  PullRequestReaction,
  SendEmailReaction,
  ResumeTextReaction,
  SuggestResponseReaction,
];

export function createAbout(): object[] {
  const services = [];
  const allServices = [];

  actionConstructors.forEach((element) => {
    let tmp = new element(
      {} as ActionDto,
      {} as ReactionDto,
      {} as User,
      {} as CancellationToken,
      '',
      true,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );
    if (!allServices.includes(tmp.service)) allServices.push(tmp.service);
  });
  reactionConstructors.forEach((element) => {
    let tmp = new element({}, {} as User, null, null, null, null, null, null);
    if (!allServices.includes(tmp.service)) allServices.push(tmp.service);
  });

  allServices.forEach((serviceName) => {
    const action = [];
    const reaction = [];
    actionConstructors.forEach((element) => {
      const tmpAction = new element(
        {} as ActionDto,
        {} as ReactionDto,
        {} as User,
        {} as CancellationToken,
        '',
        true,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      );
      if (tmpAction.service === serviceName) {
        action.push({
          method: tmpAction.method,
          description: tmpAction.description,
          example: tmpAction.example,
        });
      }
    });

    reactionConstructors.forEach((element) => {
      const tmpReaction = new element(
        {},
        {} as User,
        null,
        null,
        null,
        null,
        null,
        null,
      );
      if (tmpReaction.service === serviceName) {
        reaction.push({
          method: tmpReaction.method,
          description: tmpReaction.description,
          example: tmpReaction.example,
        });
      }
    });
    services.push({
      name: serviceName,
      actions: action,
      reactions: reaction,
    });
  });

  return services;
}

export function createMapAction(
  actionConstructors: (new (
    actionDto: ActionDto,
    reactionDto: ReactionDto,
    user: object,
    token: object,
    id: string,
    first_launch: boolean,
    githubService: GithubService,
    usersService: UsersService,
    gDriveService: GDriveService,
    openAiService: OpenAIService,
    areaService: AreaService,
    gmailService: GMailService,
    nasaService: NasaService,
  ) => ActionInterface)[],
) {
  const actionMap = {};
  actionConstructors.forEach((element) => {
    let tmp = new element(
      {} as ActionDto,
      {} as ReactionDto,
      {} as User,
      {} as CancellationToken,
      '',
      true,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );
    actionMap[tmp.method] = element;
  });
  return actionMap;
}

export function createMapReaction(
  reactionConstructors: (new (
    data: object,
    user: User,
    githubService: GithubService,
    usersService: UsersService,
    gDriveService: GDriveService,
    openAiService: OpenAIService,
    gmailService: GMailService,
    nasaService: NasaService,
  ) => ReactionInterface)[],
) {
  const reactionMap = {};
  reactionConstructors.forEach((element) => {
    let tmp = new element(
      {} as object,
      {} as User,
      null,
      null,
      null,
      null,
      null,
      null,
    );
    reactionMap[tmp.method] = element;
  });
  return reactionMap;
}

export function factoryArea(
  actionDto: ActionDto,
  reactionDto: ReactionDto,
  user: User,
  token: object,
  id: string,
  first_launch: boolean,
  githubService: GithubService,
  usersService: UsersService,
  gDriveService: GDriveService,
  openAiService: OpenAIService,
  areaService: AreaService,
  gmailService: GMailService,
  nasaService: NasaService,
): ActionInterface {
  const actionMap = createMapAction(actionConstructors);
  const action = actionMap[actionDto.type]
    ? new actionMap[actionDto.type](
        actionDto,
        reactionDto,
        user,
        token,
        id,
        first_launch,
        githubService,
        usersService,
        gDriveService,
        openAiService,
        areaService,
        gmailService,
        nasaService,
      )
    : null;
  return action;
}
