import { variableObject } from "src/utils/variable_object";
import { CancellationToken } from "../../../../utils/cancellation_token";

async function intervalAction(actionData: { interval: number}, reactionFunc: Function, reactionData: object, token: CancellationToken) {
    const data = {
        interval: actionData.interval,
    };

    setInterval(() => {
        if (token.isCancelled) return;
        reactionFunc(variableObject(data, actionData, reactionData));
    }, actionData.interval);
}

intervalAction.service = "interval";
intervalAction.method = "interval";
intervalAction.doc = "Calls the reaction every interval of time.";
intervalAction.dataExample = {
    "interval": 1000,
};

export { intervalAction };
