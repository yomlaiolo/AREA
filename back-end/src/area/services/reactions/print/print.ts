async function printReaction(reaction_data: { message: string }) {
    console.log(reaction_data.message);
}

printReaction.service = "print";
printReaction.method = "print";
printReaction.doc = "Prints the reaction data to the console.";
printReaction.dataExample = {
    "message": "Hello world!",
};

export { printReaction };