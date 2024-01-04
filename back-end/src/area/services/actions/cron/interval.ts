import { variableObject } from "../../../../utils/variable_object";
import { CancellationToken } from "../../../../utils/cancellation_token";

async function intervalAction(actionData: { hour: number, minute: number}, reactionFunc: Function, reactionData: object, token: CancellationToken) {
    // loop util the token is cancelled
    const data = {
        hour: actionData.hour,
        minute: actionData.minute,
    };
    // call the reaction function with the data
    // reactionFunc(variableObject(data, actionData, reactionData));
}

intervalAction.service = "cron";
intervalAction.method = "interval";
intervalAction.doc = "Calls the reaction every interval of time.";
intervalAction.dataExample = {
    "hour": 1,
    "minute": 20,
};

export { intervalAction };
