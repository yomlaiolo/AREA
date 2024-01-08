async function sendEmailReaction(reaction_data: { to: string, cc: string[], subject: string, body: string }) {
    console.log(reaction_data);
}

sendEmailReaction.service = "google";
sendEmailReaction.method = "send_email";
sendEmailReaction.doc = "Sends an email to the user's inbox.";
sendEmailReaction.dataExample = {
    "to": "__to__",
    "cc": "__cc__",
    "subject": "__subject__",
    "body": "__body__",
};

export { sendEmailReaction };