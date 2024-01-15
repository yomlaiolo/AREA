export const actions = [
  {
    id: 0,
    name: "Add an Action",
    icon: require('./assets/hammer_white.png'),
    backgroundColor: "#1F1F1F",
    textColor: "white",
    description: "",
    fields: [""],
    type: "none"
  },
  {
    id: 1,
    name: "Email received",
    icon: require('./assets/mail.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
    description: "Triggers when you receive an email",
    fields: [""],
    type: "receive_email"
  },
  {
    id: 2,
    name: "Pull request created",
    icon: require('./assets/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
    description: "You need to select the repository where Pull request will be Action.",
    fields: ["Repository"],
    type: "new_pull_request"
  },
  {
    id: 3,
    name: "Issue created",
    icon: require('./assets/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
    description: "You need to select the repository where Issue will be Action.",
    fields: ["Repository"],
    type: "new_issue"
  },
  {
    id: 4,
    name: "Each day at [x]",
    icon: require('./assets/clock.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
    description: "You need to select the hour when the action will be actioned each days.",
    fields: ["Time"],
    type: "recurrent"
  },
  {
    id: 5,
    name: "At [hour] on [day]",
    icon: require('./assets/calendar.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
    description: "You need to select when the action will be actioned.",
    fields: ["Time"],
    type: "recurrent"
  },
  {
    id: 6,
    name: "Every [x] time",
    icon: require('./assets/calendar.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
    description: "You need to select the gap between each action in hour and minute.",
    fields: ["Time"],
    type: "interval"
  },
  {
    id: 7,
    name: "On NASA's picture of the day change",
    icon: require('./assets/nasa.png'),
    backgroundColor: "#000000",
    redirection: "nasa",
    textColor: "white",
    value: {
      url: "__url__",
    },
    fields: [""],
    type: "nasa",
  }
];

export const reactions = [
  {
    id: 0,
    name: "Add a Reaction",
    icon: require('./assets/hammer_black.png'),
    backgroundColor: "#E88741",
    textColor: "black",
    fields: [""],
    type: "none"
  },
  {
    id: 1,
    name: "Send an email",
    icon: require('./assets/mail.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    fields: ["To", "Subject", "Body"],
    type: "send_email"
  },
  {
    id: 2,
    name: "Create a pull request",
    icon: require('./assets/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
    fields: ["Repository", "Title", "Body", "Branch", "headBranch"],
    type: "pull_request"
  },
  {
    id: 3,
    name: "Create an issue",
    icon: require('./assets/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
    fields: ["Repository", "Title", "Body"],
    type: "issue"
  },
  {
    id: 4,
    name: "Resume a text",
    icon: require('./assets/openai.png'),
    backgroundColor: "#10A37F",
    textColor: "black",
    fields: ["Text"],
    type: "resume_text"
  },
  {
    id: 5,
    name: "Suggest a response",
    icon: require('./assets/openai.png'),
    backgroundColor: "#10A37F",
    textColor: "black",
    fields: ["Text"],
    type: "resume_response"
  },
];