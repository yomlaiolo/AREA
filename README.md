# AREA

Area Repository

## Application deployment

Build

```bash
docker-compose build
```

Deploy

```bash
docker-compose up
```

## API

### USERS

`GET /users`

##### Bearer Token

Responses:

```json
200 - OK
{
  "username": "string",
  "email": "string",
  "id": "string",
  "google_connected": true,
  "github_connected": true
}
```

```json
401 - Unauthorized
```

`GET /about.json`

Responses:

```json
200 - OK
{
  "client": {
    "host": "localhost:8080"
  },
  "server": {
    "current_time": 1705488143260,
    "services": [
      {
        "name": "cron",
        "actions": [
          {
            "method": "interval",
            "description": "Calls the reaction every interval of time.",
            "example": {
              "hour": 14,
              "minute": 30
            }
          },
          {
            "method": "recurrent",
            "description": "Calls the reaction according to the cron expression.",
            "example": {
              "cron": "0 14 * * * *"
            }
          }
        ],
        "reactions": []
      },
      {
        "name": "github",
        "actions": [
          {
            "method": "new_issue",
            "description": "Calls the reaction when a new issue is created.",
            "example": {
              "repo": "myRepository",
              "title": "issue title",
              "body": "issue body"
            }
          },
          {
            "method": "new_pull_request",
            "description": "Calls the reaction when a new pull request is created.",
            "example": {
              "repo": "myRepository",
              "title": "pull request title",
              "body": "pull request body",
              "fromBranch": "dev",
              "headBranch": "master"
            }
          }
        ],
        "reactions": [
          {
            "method": "issue",
            "description": "create an issue on github",
            "example": {
              "repoName": "myRepository",
              "title": "awesome title",
              "body": "basic body"
            }
          },
          {
            "method": "pull_request",
            "description": "create a pull request on github",
            "example": {
              "repoName": "myRepository",
              "title": "awesome title",
              "body": "basic body",
              "headBranch": "dev",
              "baseBranch": "main"
            }
          }
        ]
      },
      {
        "name": "google",
        "actions": [
          {
            "method": "receive_email",
            "description": "Receives an email from the user's inbox.",
            "example": {
              "from": "__from__",
              "to": "__to__",
              "subject": "__subject__",
              "body": "__body__"
            }
          }
        ],
        "reactions": [
          {
            "method": "send_email",
            "description": "Sends an email to the user's inbox.",
            "example": {
              "to": "__to__",
              "subject": "__subject__",
              "body": "__body__"
            }
          },
          {
            "method": "delete_file",
            "description": "Delete a file from Google Drive.",
            "example": {
              "fileName": "__file__"
            }
          },
          {
            "method": "create_doc",
            "description": "Create a doc file in Google Drive.",
            "example": {
              "fileName": "__file__",
              "fileContent": "__file_content__"
            }
          },
          {
            "method": "create_sheet",
            "description": "Create a sheet file in Google Drive.",
            "example": {
              "fileName": "__file__",
              "fileContent": "__file_content__"
            }
          }
        ]
      },
      {
        "name": "nasa",
        "actions": [
          {
            "method": "nasa",
            "description": "On nasa picture of the day, calls the reaction",
            "example": {
              "url": "https://apod.nasa.gov/apod/image/2103/NGC1499_LDN1622_HaO3RGB1024.jpg"
            }
          }
        ],
        "reactions": []
      },
      {
        "name": "openai",
        "actions": [],
        "reactions": [
          {
            "method": "resume_text",
            "description": "Resume the message with openai.",
            "example": {
              "message": "__message__"
            }
          },
          {
            "method": "suggest_response",
            "description": "Suggest a response to the message with openai.",
            "example": {
              "message": "__message__"
            }
          }
        ]
      }
    ]
  }
}
```

### AUTH

`POST /auth/login`

Body:

```json
{
  "email": "email@gmail.com",
  "password": "Passw0rd"
}
```

Responses:

```json
200 - OK
{
  "access_token": "string"
}
```

```json
401 - Unauthorized
```

`POST /auth/register`

Body:

```json
{
  "username": "username",
  "email": "email@gmail.com",
  "password": "Passw0rd",
  "is_google_oauth": false,
  "photo": null,
  "id_token": null,
  "google": null
}
```

Responses:

```json
201 - Created
{
  "id": "string"
}
```

```json
400 - Bad Request
```

```json
406 - Not Acceptable - invalid email / password
```

```json
409 - Conflict
```

`POST /auth/change-password`

##### Bearer Token

Body:

```json
{
  "old_password": "string",
  "new_password": "string"
}
```

Responses:

```json
200 - OK
```

```json
400 - Bad Request
```

```json
401 - Unauthorized
```

```json
406 - Not Acceptable
```

`POST /auth/change-profile`

##### Bearer Token

Body:

```json
{
  "password": "string",
  "username": "string",
  "email": "string"
}
```

Responses:

```json
200 - OK
```

```json
400 - Bad Request
```

```json
401 - Unauthorized
```

```json
406 - Not Acceptable
```

```json
409 - Conflict
```

`POST /auth/google`

Body:

```json
{
  "user": {
    "email": "string",
    "familyName": "string",
    "givenName": "string",
    "id": "string",
    "name": "string",
    "photo": "string"
  },
  "server_auth_code": "string",
  "id_token": "string"
}
```

Responses:

```json
200 - OK
{
  "access_token": "string"
}
```

```json
400 - Bad Request
```

```json
401 - Unauthorized
```

```json
409 - Conflict
```

`POST /auth/google-access-token`

Body:

```json
{
  "access_token": "string"
}
```

Responses:

```json
200 - OK
{
  "access_token": "string"
}
```

```json
400 - Bad Request
```

```json
401 - Unauthorized
```

```json
409 - Conflict
```

### GITHUB

`POST /github/token`

##### Bearer Token

Body:

```json
{
  "token": "string"
}
```

Responses:

```json
201 - Created
```

`POST /github/webhook/{uuid}`

Query:

```json
"uuid": "string"
```

Responses:

```
201 - Created
```

### AREA

`POST /area/create`

##### Beared Token

Body:

```json
{
  "name": "My area",
  "description": "My area description",
  "action": {
    "type": "new_pull_request",
    "value": {
      "repo": "APITest",
      "title": "__title__",
      "body": "__body__",
      "fromBranch": "__fromBranch__",
      "headBranch": "__headBranch__"
    }
  },
  "reaction": {
    "type": "issue",
    "value": {
      "repoOwner": "TerryMazzoni",
      "repoName": "APITest",
      "title": "__fromBranch__",
      "body": "__headBranch__"
    }
  }
}
```

Responses:

```json
201 - Created
```

```json
400 - Bad Request
```

`DELETE /area/delete/{id}`

##### Beared Token

Query:

```json
"id": "string"
```

Responses:

```json
200 - OK
```

```json
404 - Not Found - Area not found
```

`DELETE /area/results/{id}`

##### Beared Token

Query:

```json
"id": "string"
```

Responses:

```json
200 - OK
```

```json
404 - Not Found - Area not found
```

`GET /area`

##### Beared Token

```json
200 - OK
[
  {
    "name": "My area",
    "description": "My area description",
    "action": {
      "type": "<action_type>",
      "value": {}
    },
    "reaction": {
      "type": "<reaction_type>",
      "value": {}
    }
  }
]
```
