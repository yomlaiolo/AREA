async function newPullRequestReaction(reaction_data: { }) {
    console.log(reaction_data);
}

newPullRequestReaction.service = "github";
newPullRequestReaction.method = "create_pull_request";
newPullRequestReaction.doc = "create a pull request";
newPullRequestReaction.dataExample = {
};

export { newPullRequestReaction };