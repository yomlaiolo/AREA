import { User } from 'src/users/user.schema';

async function newIssueReaction(reaction_data: {}, user: User) {
  console.log(reaction_data);
}

newIssueReaction.service = 'github';
newIssueReaction.method = 'create_issue';
newIssueReaction.doc = 'create an issue';
newIssueReaction.dataExample = {};

export { newIssueReaction };
