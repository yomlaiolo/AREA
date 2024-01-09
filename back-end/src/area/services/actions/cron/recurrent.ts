import { variableObject } from '../../../../utils/variable_object';
import { CancellationToken } from '../../../../utils/cancellation_token';
import { User } from 'src/users/user.schema';
import { BadRequestException } from '@nestjs/common';

async function recurrentAction(
  actionData: { cron: string },
  reactionFunc: Function,
  reactionData: object,
  token: CancellationToken,
  user: User,
) {
  const data = {
    cron: actionData.cron,
  };
  const cron = require('node-cron');
  if (!cron.validate(data.cron))
    throw new BadRequestException('Invalid cron expression');
  cron.schedule(data.cron, () => {
    if (token.isCancelled) {
      return;
    }

    try {
      reactionFunc(variableObject(data, actionData, reactionData), user);
    } catch (error) {
      console.error(`Error in reactionFunc: ${error} for user ${user}`);
    }
  });
}

recurrentAction.service = 'cron';
recurrentAction.method = 'recurrent';
recurrentAction.doc = 'Calls the reaction every day at the specified time.';
recurrentAction.dataExample = {
  cron: '6 15 0 * * *',
};

export { recurrentAction };
