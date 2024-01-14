import { User } from 'src/users/user.schema';

async function resumeTextReaction(
  reaction_data: { message: string },
  user: User,
) {
  console.log(reaction_data);
}

resumeTextReaction.service = 'openai';
resumeTextReaction.method = 'resume_text';
resumeTextReaction.doc = 'Resume the message with openai.';
resumeTextReaction.dataExample = {
  message: '__message__',
};
resumeTextReaction.type = 'function';

export { resumeTextReaction };
