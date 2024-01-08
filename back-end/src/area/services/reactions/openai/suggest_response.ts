async function suggestResponseReaction(reaction_data: { message: string }) {
    console.log(reaction_data);
}

suggestResponseReaction.service = "openai";
suggestResponseReaction.method = "suggest_response";
suggestResponseReaction.doc = "Suggest a response to the message with openai.";
suggestResponseReaction.dataExample = {
    "message": "__message__",
};

export { suggestResponseReaction };