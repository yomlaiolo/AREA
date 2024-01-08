import { variableObject } from '../../../../utils/variable_object';
import { CancellationToken } from '../../../../utils/cancellation_token';
import cron from 'node-cron';

async function recurrentAction(
  actionData: { cron: string },
  reactionFunc: Function,
  reactionData: object,
  token: CancellationToken,
) {
  const data = {
    cron: actionData.cron,
  };

  cron.schedule(actionData.cron, () => {
    if (token.isCancelled) {
      return;
    }

    try {
      reactionFunc(variableObject(data, actionData, reactionData));
    } catch (error) {
      console.error('Error in reactionFunc:', error);
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
