async function newIssueReaction(reaction_data: { }) {
    console.log(reaction_data);
}

newIssueReaction.service = "github";
newIssueReaction.method = "create_issue";
newIssueReaction.doc = "create an issue";
newIssueReaction.dataExample = {
};

export { newIssueReaction };