import { variableObject } from '../../../../utils/variable_object';
import { CancellationToken } from '../../../../utils/cancellation_token';
import { User } from 'src/users/user.schema';
import { BadRequestException } from '@nestjs/common';

async function intervalAction(
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
  if (!cron.validate(actionData.cron))
    throw new BadRequestException('Invalid cron expression');
  cron.schedule(data.cron, () => {
    if (token.isCancelled) {
      return;
    }

    try {
      reactionFunc(variableObject(data, actionData, reactionData), user);
    } catch (error) {
      console.error('Error in reactionFunc:', error);
    }
  });
}

intervalAction.service = 'cron';
intervalAction.method = 'interval';
intervalAction.doc = 'Calls the reaction every interval of time.';
intervalAction.dataExample = {
  cron: '*/10 * * * * *',
};

export { intervalAction };
