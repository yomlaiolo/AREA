export const actions = [
  {
    id: 0,
    name: "Add an Action",
    icon: require('@ressources/hammer_white.png'),
    backgroundColor: "#1F1F1F",
    textColor: "white",
  },
  {
    id: 1,
    name: "Email received",
    icon: require('@ressources/mail.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
  },
  {
    id: 2,
    name: "Pull request created",
    icon: require('@ressources/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
  },
  {
    id: 3,
    name: "Issue created",
    icon: require('@ressources/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
  },
  {
    id: 4,
    name: "Every [x] time",
    icon: require('@ressources/clock.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
  },
  {
    id: 5,
    name: "At [hour] on [day]",
    icon: require('@ressources/calendar.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
  },
];

export const reactions = [
  {
    id: 0,
    name: "Add a Reaction",
    icon: require('@ressources/hammer_black.png'),
    backgroundColor: "#E88741",
    textColor: "black",
  },
  {
    id: 1,
    name: "Send an email",
    icon: require('@ressources/mail.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
  },
  {
    id: 2,
    name: "Create a pull request",
    icon: require('@ressources/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
  },
  {
    id: 3,
    name: "Create an issue",
    icon: require('@ressources/github.png'),
    backgroundColor: "#CCCCCC",
    textColor: "black",
    redirection: "github",
  },
  {
    id: 4,
    name: "Send a notification",
    icon: require('@ressources/notification.png'),
    backgroundColor: "#CCBBAA",
    textColor: "black",
  },
  {
    id: 5,
    name: "Resume a text",
    icon: require('@ressources/openai.png'),
    backgroundColor: "#10A37F",
    textColor: "black",
  },
  {
    id: 6,
    name: "Suggest a response",
    icon: require('@ressources/openai.png'),
    backgroundColor: "#10A37F",
    textColor: "black",
  },
];