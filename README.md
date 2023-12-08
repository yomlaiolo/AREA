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
### POST /register
```json
{
    "username": "name",
    "firstname": "firstname",
    "lastname": "lastname",
    "email": "email",
    "password": "mdp"
}
```

Responses:
```json
201 - Created
{
    "id": "911"
}
```
```json
406 - Not Acceptable
{
    "message": "Password / email not secured"
}
```
```json
409 - Conflict
{
    "message": "user already registered"
}
```

### POST /login
```json
{
    "email": "email",
    "password": "mdp"
}
```

Responses:
```json
{
    "id": "911",
    "bearer_token": "<token>"
}
```
```json
401 - Unauthorized
{
    "message": "email or password is wrong"
}
```

### GET /user
```json
no body
```

Responses:
```json
200 - OK
{
    "id": "911",
    "username": "name",
    "firstname": "firstname",
    "lastname": "lastname",
    "email": "email"
}
```
```json
401 - Unauthorized
{
    "message": "invalid token"
}
```

### PUT /user - with bearer token
```json
{
    "email": "mail",
    "password": "mdp",
    "newpassword": "mdp2"
}
```

Responses:
```json
200 - OK
```
```json
401 - Unauthorized
{
    "message": "invalid token"
}
```

### GET /about.json
```json
no body
```

Responses:
```json
200 - OK
{
    "client": {
        "host": "localhost:8080"
    },
    "server": {
        "current_time": 1701681052541,
        "services": [
            {
                "name": "example",
                "actions": [
                    {
                        "name": "first_action_example",
                        "description": "Something incredible happens"
                    },
                    {
                        "name": "second_action_example",
                        "description": "Something pretty cool happens but it's different from the first action"
                    }
                ],
                "reactions": [
                    {
                        "name": "reaction_example",
                        "description": "Something expected happens when the action is triggered"
                    }
                ]
            }
        ]
    }
}
```
