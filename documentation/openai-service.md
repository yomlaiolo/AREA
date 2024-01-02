# OPENAI SERVICE

In order to use the OpenAI service, the user need to connect to the OpenAI Service, generating or giving is API Key.

This Service provide 3 Reactions to the user :

- Resume a text. ( Example : An email from the google gmail api. )
- Generate a response to a text. ( Example : Generate automatically a response to an email. )
- Resume a file. ( Example : A pdf in an email. )

## How to use this service ?

Once this flow is created, when an action is triggered, you should use fonctions of OpenAIService.

### ResumeEmail 

> Arguments :

- prompt : A string with the content of an email.

- token : The OpenAI Api key of the ForgeFlow user.

- language ( english as default) : Set the language in which the AI will sumarize the email.

> Return :

A string which sumarize the email in the language asked.

### SuggestEmailResponse

> Arguments :

- prompt : A string with the content of an email.

- token : The OpenAI Api key of the ForgeFlow user.

- language ( english as default) : Set the language in which the AI will sumarize the email.

> Return :

A string which is a suggestion to response to the email received. If the email doesn't need response, the AI will told you so.

## ResumeFile

> Arguments :

- file_path : The path of the file to sumarize.

- token : The OpenAI Api key of the ForgeFlow user.

- language ( english as default) : Set the language in which the AI will sumarize the email.

> Return :

A string which sumarize the file in the language asked.