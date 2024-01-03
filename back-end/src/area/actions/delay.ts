import { CancellationToken } from "../cancellation";

function intervalAction(actionData: string | object | number | boolean, reactionFunc: Function, reactionData: string | object | number | boolean, token: CancellationToken) {
    const interval = actionData as number;
    setInterval(() => {
        if (token.isCancelled) return;
        reactionFunc(reactionData);
    }, interval);
}

export { intervalAction };
