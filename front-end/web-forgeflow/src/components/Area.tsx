export const actions = [
  {
    id: 0,
    name: "Add an Action",
    type: "none",
    icon: require('../assets/hammer_white.png'),
    backgroundColor: "#1F1F1F",
    textColor: "white",
  },
  {
    id: 1,
    name: "Email received",
    type: "receive_email",
    icon: require('../assets/mail.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
    value: {
      from: "__from__",
      cc: "__cc__",
      to: "__to__",
      subject: "__subject__",
      body: "__body__",
    }
  },
  {
    id: 2,
    name: "Pull request created",
    type: "new_pull_request",
    icon: require('../assets/github_white.png'),
    backgroundColor: "#0D1117",
    textColor: "white",
    redirection: "github",
    value: {
      fromBranch: "__fromBranch__",
      toBranch: "__toBranch__",
    }
  },
  {
    id: 3,
    name: "Issue created",
    type: "new_issue",
    icon: require('../assets/github_white.png'),
    backgroundColor: "#0D1117",
    textColor: "white",
    redirection: "github",
    value: {
      title: "__title__",
      body: "__body__",
    }
  },
  {
    id: 4,
    name: "Each day at [x]",
    type: "recurrent",
    icon: require('../assets/clock.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
    value: {
    }
  },
  {
    id: 5,
    name: "At [hour] on [day]",
    type: "recurrent",
    icon: require('../assets/calendar.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
    value: {
    }
  },
  {
    id: 6,
    name: "Every [x] time",
    type: "interval",
    icon: require('../assets/clock.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
    value: {
    }
  }
];

export const reactions = [
  {
    id: 0,
    name: "Add a Reaction",
    type: "none",
    icon: require('../assets/hammer_black.png'),
    backgroundColor: "#E88741",
    textColor: "black",
  },
  {
    id: 1,
    name: "Send an email",
    type: "send_email",
    icon: require('../assets/mail.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
    value: {
      to: "__to__",
      cc: "__cc__",
      subject: "__subject__",
      body: "__body__",
    }
  },
  {
    id: 2,
    name: "Create a pull request",
    type: "create_pull_request",
    icon: require('../assets/github_white.png'),
    backgroundColor: "#0D1117",
    textColor: "white",
    redirection: "github",
    value: {
      repo: "__repo__",
      fromBranch: "__fromBranch__",
      toBranch: "__toBranch__",
    }
  },
  {
    id: 3,
    name: "Create an issue",
    type: "create_issue",
    icon: require('../assets/github_white.png'),
    backgroundColor: "#0D1117",
    textColor: "white",
    redirection: "github",
    value: {
      repo: "__repo__",
      title: "__title__",
      body: "__body__",
    }
  },
  {
    id: 4,
    name: "Send a notification",
    type: "send_notification",
    icon: require('../assets/notification_white.png'),
    backgroundColor: "#AABBDD",
    textColor: "white",
    redirection: "notification",
    value: {
      title: "__title__",
      body: "__body__",
    }
  },
  {
    id: 5,
    name: "Resume a text",
    type: "resume_text",
    icon: require('../assets/openai_white.png'),
    backgroundColor: "#10A37F",
    textColor: "white",
    redirection: "openai",
    value: {
      text: "__text__",
    }
  },
  {
    id: 6,
    name: "Suggest a response",
    type: "suggest_response",
    icon: require('../assets/openai_white.png'),
    backgroundColor: "#10A37F",
    textColor: "white",
    redirection: "openai",
    value: {
      text: "__text__",
    }
  },
];