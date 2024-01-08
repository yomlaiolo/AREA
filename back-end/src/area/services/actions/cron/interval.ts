import { variableObject } from '../../../../utils/variable_object';
import { CancellationToken } from '../../../../utils/cancellation_token';

async function intervalAction(
  actionData: { cron: string },
  reactionFunc: Function,
  reactionData: object,
  token: CancellationToken,
) {
  const data = {
    cron: actionData.cron,
  };
  const cron = require('node-cron');
  cron.schedule(data.cron, () => {
    reactionFunc(variableObject(data, actionData, reactionData));
  });
}

intervalAction.service = 'cron';
intervalAction.method = 'interval';
intervalAction.doc = 'Calls the reaction every interval of time.';
intervalAction.dataExample = {
  cron: '*/10 * * * * *',
};

export { intervalAction };
