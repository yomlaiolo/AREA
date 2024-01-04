import { variableObject } from "../../../../utils/variable_object";
import { CancellationToken } from "../../../../utils/cancellation_token";

async function recurrentAction(actionData: { hour: number, minute: number}, reactionFunc: Function, reactionData: object, token: CancellationToken) {
    // loop util the token is cancelled
    const data = {
        hour: actionData.hour,
        minute: actionData.minute,
    };
    // call the reaction function with the data
    // reactionFunc(variableObject(data, actionData, reactionData));
}

recurrentAction.service = "cron";
recurrentAction.method = "recurrent";
recurrentAction.doc = "Calls the reaction every day at the specified time.";
recurrentAction.dataExample = {
    "hour": 14,
    "minute": 20,
};

export { recurrentAction };
