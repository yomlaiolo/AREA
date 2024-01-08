async function sendNotificationReaction(reaction_data: { message: string }) {
    console.log(reaction_data);
}

sendNotificationReaction.service = "notification";
sendNotificationReaction.method = "send_notification";
sendNotificationReaction.doc = "Sends a notification to the user's device.";
sendNotificationReaction.dataExample = {
    "message": "__message__",
};

export { sendNotificationReaction };