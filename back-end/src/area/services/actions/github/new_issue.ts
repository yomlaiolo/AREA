import { variableObject } from "../../../../utils/variable_object";
import { CancellationToken } from "../../../../utils/cancellation_token";

async function newIssueAction(actionData: { }, reactionFunc: Function, reactionData: object, token: CancellationToken) {
    // loop util the token is cancelled
    const data = {

    };
    // call the reaction function with the data
    // reactionFunc(variableObject(data, actionData, reactionData));
}

newIssueAction.service = "github";
newIssueAction.method = "new_issue";
newIssueAction.doc = "Calls the reaction when a new issue is created.";
newIssueAction.dataExample = {

};

export { newIssueAction };
