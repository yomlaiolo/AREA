export const actions = [
  {
    id: 0,
    name: "Add an Action",
    type: "none",
    icon: require('@ressources/hammer_white.png'),
    backgroundColor: "#1F1F1F",
    textColor: "white",
  },
  {
    id: 1,
    name: "Email received",
    type: "receive_email",
    icon: require('@ressources/mail.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
    value: {
      from: "__from__",
      to: "__to__",
      subject: "__subject__",
      body: "__body__",
    }
  },
  {
    id: 2,
    name: "Pull request created",
    type: "new_pull_request",
    icon: require('@ressources/github_white.png'),
    backgroundColor: "#0D1117",
    textColor: "white",
    redirection: "github",
    value: {
      title: "__title__",
      body: "__body__",
      fromBranch: "__fromBranch__",
      headBranch: "__headBranch__",
    }
  },
  {
    id: 3,
    name: "Issue created",
    type: "new_issue",
    icon: require('@ressources/github_white.png'),
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
    icon: require('@ressources/clock.png'),
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
    icon: require('@ressources/calendar.png'),
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
    icon: require('@ressources/clock.png'),
    backgroundColor: "#67A1B5",
    textColor: "black",
    redirection: "cron",
    value: {
    }
  },
  {
    id: 7,
    name: "On NASA's picture of the day change",
    type: "nasa",
    icon: require('@ressources/nasa.png'),
    backgroundColor: "#000000",
    textColor: "white",
    redirection: "nasa",
    value: {
      url: '__url__',
    }
  }
];

export const reactions = [
  {
    id: 0,
    name: "Add a Reaction",
    type: "none",
    icon: require('@ressources/hammer_black.png'),
    backgroundColor: "#E88741",
    textColor: "black",
  },
  {
    id: 1,
    name: "Send an email",
    type: "send_email",
    icon: require('@ressources/mail.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
    value: {
      to: "__to__",
      subject: "__subject__",
      body: "__body__",
    }
  },
  {
    id: 2,
    name: "Create a pull request",
    type: "pull_request",
    icon: require('@ressources/github_white.png'),
    backgroundColor: "#0D1117",
    textColor: "white",
    redirection: "github",
    value: {
      repoName: "__repo__",
      title: "__title__",
      body: "__body__",
      fromBranch: "__fromBranch__",
      headBranch: "__headBranch__",
    }
  },
  {
    id: 3,
    name: "Create an issue",
    type: "issue",
    icon: require('@ressources/github_white.png'),
    backgroundColor: "#0D1117",
    textColor: "white",
    redirection: "github",
    value: {
      repoName: "__repo__",
      title: "__title__",
      body: "__body__",
    }
  },
  {
    id: 4,
    name: "Resume a text",
    type: "resume_text",
    icon: require('@ressources/openai_white.png'),
    backgroundColor: "#10A37F",
    textColor: "white",
    redirection: "openai",
    value: {
      message: "__text__",
    }
  },
  {
    id: 5,
    name: "Suggest a response",
    type: "suggest_response",
    icon: require('@ressources/openai_white.png'),
    backgroundColor: "#10A37F",
    textColor: "white",
    redirection: "openai",
    value: {
      message: "__text__",
    }
  },
  {
    id: 6,
    name: "Delete a file",
    type: "delete_file",
    icon: require('@ressources/drive.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
    value: {
      fileName: "__fileName__",
    }
  },
  {
    id: 7,
    name: "Create a doc",
    type: "create_doc",
    icon: require('@ressources/docs.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
    value: {
      fileName: "__fileName__",
      fileContent: "__fileContent__",
    }
  },
  {
    id: 8,
    name: "Create a sheet",
    type: "create_sheet",
    icon: require('@ressources/sheets.png'),
    backgroundColor: "#4A4863",
    textColor: "white",
    redirection: "google",
    value: {
      fileName: "__fileName__",
      fileContent: "__fileContent__",
    }
  }
];