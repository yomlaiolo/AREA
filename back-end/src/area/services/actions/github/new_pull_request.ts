import { variableObject } from "../../../../utils/variable_object";
import { CancellationToken } from "../../../../utils/cancellation_token";

async function newPullRequestAction(actionData: { }, reactionFunc: Function, reactionData: object, token: CancellationToken) {
    // loop util the token is cancelled
    const data = {

    };
    // call the reaction function with the data
    // reactionFunc(variableObject(data, actionData, reactionData));
}

newPullRequestAction.service = "github";
newPullRequestAction.method = "new_pull_request";
newPullRequestAction.doc = "Calls the reaction when a new pull request is created.";
newPullRequestAction.dataExample = {

};

export { newPullRequestAction };
