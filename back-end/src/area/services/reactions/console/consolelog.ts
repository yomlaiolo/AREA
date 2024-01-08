async function consoleLogReaction(reaction_data: { message: string }) {
  console.log(reaction_data.message);
}

consoleLogReaction.service = 'console';
consoleLogReaction.method = 'console_log';
consoleLogReaction.doc =
  'console log the message. This is useful for debugging';
consoleLogReaction.dataExample = {
  message: '__message__',
};

export { consoleLogReaction };
