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
    type: "new_pull_rrquest"
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
    fields: ["To", "CC", "Subject", "Body"],
    type: "send_email"
  },
  {
    id: 2,
    name: "Create a pull request",
    icon: require('./assets/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
    fields: ["Repository", "Branch", "ToBranch"],
    type: "create_pull_request"
  },
  {
    id: 3,
    name: "Create an issue",
    icon: require('./assets/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
    fields: ["Repository", "Title", "Body"],
    type: "create_issue"
  },
  {
    id: 4,
    name: "Send a notification",
    icon: require('./assets/notification.png'),
    backgroundColor: "#AABBDD",
    textColor: "black",
    fields: ["Title", "Body"],
    type: "send_notification"
  },
  {
    id: 5,
    name: "Resume a text",
    icon: require('./assets/openai.png'),
    backgroundColor: "#10A37F",
    textColor: "black",
    fields: ["Text"],
    type: "resume_text"
  },
  {
    id: 6,
    name: "Suggest a response",
    icon: require('./assets/openai.png'),
    backgroundColor: "#10A37F",
    textColor: "black",
    fields: ["SuggestFrom"],
    type: "resume_response"
  },
];