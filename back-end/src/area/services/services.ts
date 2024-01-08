import { ActionDto, ReactionDto } from '../dto/create-area.dto';

// Actions #########################################################
// cron
import { intervalAction } from './actions/cron/interval';
import { recurrentAction } from './actions/cron/recurrent';
// github
import { newIssueAction } from './actions/github/new_issue';
import { newPullRequestAction } from './actions/github/new_pull_request';
// google
import { receiveEmailAction } from './actions/google/receive_email';
import { consoleLogReaction } from './reactions/console/consolelog';

// Reactions #######################################################
// github
import { newIssueReaction } from './reactions/github/issue';
import { newPullRequestReaction } from './reactions/github/pull_request';
// google
import { sendEmailReaction } from './reactions/google/send_email';
// notification
import { sendNotificationReaction } from './reactions/notification/send_notification';
// openai
import { resumeTextReaction } from './reactions/openai/resume_text';
import { suggestResponseReaction } from './reactions/openai/suggest_response';

function createList(functions: Function[]) {
  const List = {};
  functions.forEach((action) => {
    List[action['method']] = action;
  });
  return List;
}

const actions = [
  intervalAction,
  recurrentAction,
  newIssueAction,
  newPullRequestAction,
  receiveEmailAction,
];

const reactions = [
  newIssueReaction,
  newPullRequestReaction,
  sendEmailReaction,
  sendNotificationReaction,
  resumeTextReaction,
  suggestResponseReaction,
  consoleLogReaction,
];

export const actionsList = createList(actions);
export const reactionsList = createList(reactions);

export function factoryAction(actionDto: ActionDto): Function | null {
  if (actionDto.type in actionsList) return actionsList[actionDto.type];
  return null;
}

export function factoryReaction(reactionDto: ReactionDto): Function | null {
  if (reactionDto.type in reactionsList) return reactionsList[reactionDto.type];
  return null;
}
