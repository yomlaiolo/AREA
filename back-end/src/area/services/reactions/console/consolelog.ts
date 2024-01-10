import { User } from 'src/users/user.schema';

async function consoleLogReaction(
  reaction_data: { message: string },
  user: User,
) {
  console.log(reaction_data.message);
}

consoleLogReaction.service = 'console';
consoleLogReaction.method = 'console_log';
consoleLogReaction.doc =
  'console log the message. This is useful for debugging';
consoleLogReaction.dataExample = {
  message: '__message__',
};
consoleLogReaction.type = 'function';

export { consoleLogReaction };
