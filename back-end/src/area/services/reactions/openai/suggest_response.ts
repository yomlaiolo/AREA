import { User } from 'src/users/user.schema';

async function suggestResponseReaction(
  reaction_data: { message: string },
  user: User,
) {
  console.log(reaction_data);
}

suggestResponseReaction.service = 'openai';
suggestResponseReaction.method = 'suggest_response';
suggestResponseReaction.doc = 'Suggest a response to the message with openai.';
suggestResponseReaction.dataExample = {
  message: '__message__',
};
suggestResponseReaction.type = 'function';

export { suggestResponseReaction };
