async function resumeTextReaction(reaction_data: { message: string }) {
    console.log(reaction_data);
}

resumeTextReaction.service = "openai";
resumeTextReaction.method = "resume_text";
resumeTextReaction.doc = "Resume the message with openai.";
resumeTextReaction.dataExample = {
    "message": "__message__",
};

export { resumeTextReaction };