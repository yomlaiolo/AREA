import { User } from 'src/users/user.schema';

async function sendNotificationReaction(
  reaction_data: { message: string },
  user: User,
) {
  console.log(reaction_data);
}

sendNotificationReaction.service = 'notification';
sendNotificationReaction.method = 'send_notification';
sendNotificationReaction.doc = "Sends a notification to the user's device.";
sendNotificationReaction.dataExample = {
  message: '__message__',
};
sendNotificationReaction.type = 'function';

export { sendNotificationReaction };
