import { log } from "console";

function createVariable(data: object, variables: object): { result: object, valid: boolean } {
  let result = {};
  let isValid = true;
  for (let key in data) {
    if (variables['value'][key]) {
      if (typeof variables['value'][key] == 'string')
        if (variables['value'][key].startsWith('__') && variables['value'][key].endsWith('__')) {
          result[variables['value'][key]] = data[key];
        } else {
          if (variables['value'][key] != data[key]) {
            isValid = false;
            break;
          }
        }
      else if (typeof variables[key] == 'object') {
        console.log(variables[key], "object") // not supported yet, maybe later but it's not a priority
      }
    }
  }
  return { result: result, valid: isValid };
}

function assignVariable(variableObject: object, dataOut: object): object {
  let result = {};
  for (let key in dataOut) {
    if (typeof dataOut[key] == 'string')
      if (dataOut[key].startsWith('__') && dataOut[key].endsWith('__')) {
        result[key] = variableObject[dataOut[key]];
      } else {
        result[key] = dataOut[key];
      }
    else if (typeof dataOut[key] == 'object')
      if (Array.isArray(dataOut[key])) {
        result[key] = [];
        for (let i = 0; i < dataOut[key].length; i++) {
          result[key].push(assignVariable(variableObject, { here: dataOut[key][i] })['here']);
        }
      } else {
        result[key] = assignVariable(variableObject, dataOut[key]);
      }
  }
  return result;
}

export function variableObject(data: object, actionData: object, reactionData: object): object {
  let variableObject = createVariable(data, actionData);
  if (variableObject.valid) {
    return assignVariable(variableObject.result, reactionData);
  } else {
    return { error: "Invalid data" };
  }
}

// Example for the "email" action and the "prompt" reaction

let data = { // create this in the action
  "from": "antonin@laudon.info",
  "cc": ["a", "b"],
  "subject": "Hello",
  "body": "World"
}

let actionData = { // get this from the action.data, one of depth only (not supported yet for nested objects)
  "from": "antonin@laudon.info", // assert that the value in from is equal to "antonin@laudon", or else it will return an error object
  "cc": "__cc__",
  "subject": "__subject__",
  "body": "__body__",
}

let reactionData = { // get this from the reaction.data
  "prompt": {
    "title": [
      "__body__",
      "__cc__"
    ],
    "message": "__subject__"
  },
}

// console.log(JSON.stringify(variableObject(data, actionData, reactionData), null, 2));

// Output will be:
let output = {
  "prompt": {
    "title": [
      "World",
      [
        "a",
        "b"
      ]
    ],
    "message": "Hello"
  }
}

