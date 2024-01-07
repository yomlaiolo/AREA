import { CancellationToken } from "../../../../utils/cancellation_token";
import { variableObject } from "../../../../utils/variable_object";

async function receiveEmailAction(actionData: object, reactionFunc: Function, reactionData: object, token: CancellationToken) {
    const data = { // set this data in the action
        "from": "",
        "cc": [],
        "to": "",
        "subject": "",
    }

    const dataForReaction = variableObject(data, actionData, reactionData);

    console.log(dataForReaction);
}

receiveEmailAction.service = "google";
receiveEmailAction.method = "receive_email";
receiveEmailAction.doc = "Receives an email from the user's inbox.";
receiveEmailAction.dataExample = {
    "from": "__from__",
    "cc": "__cc__",
    "to": "__to__",
    "subject": "__subject__",
};

export { receiveEmailAction };