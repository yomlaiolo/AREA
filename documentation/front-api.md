# FRONT API CONNECTION

There is the documentation to use the API from the front (mobile and web).

### resister()

Parameters:
 - username: string
 - email: string
 - password: string
 - navigation: any

The function navigate to the 'Home' page if the credentials are correct and stock the token the API sends us.
It show an alert if the credentials are incorrect.

### login()

Parameters:
 - email: string
 - password: string
 - navigation: any

The function navigate to the 'Home' page if the credentials are correct and stock the token the API sends us.
It show an alert if the credentials are incorrect.

### userInfo()

No parameters.

Must be logged to use it.

The function set the 'username' and 'email' variables in AsyncStorage if it worked, and remove these variables if it doesn't worked.

### isGoogleLoggedIn()

No parameters.

Must be logged to use it.

Return true if the user is logged with Google, and false if he's not.

### isGithubeLoggedIn()

No parameters.

Must be logged to use it.

Return true if the user is logged with Github, and false if he's not.

### modifyProfile()

Parameters:
 - username: string
 - email: string
 - password: string

Must be logged to use it.

Set the variables 'username' and 'email' in AsyncStorage.

Return 0 if it worked, or the text error if it doesn't worked. 


### modifyPassword()

Parameters:
 - oldPassword: string
 - newPassword: string

Must be logged to use it.

Return 0 if it worked, or the text error if it doesn't worked.

### signInWithGithub()

No parameters.

Must be logged to use it.

Log the user to Github and send the Github OAuth token to the API.

### googleSignInFunc()

No parameters.

Log the user to Google, and send the informations to the API who get the Google OAuth token.

Return true if the user is correctly connected to Google, false otherwise.

### getRepo()

No parameters.

Must be logged to Github to use it.

Return the list of repositories of the user.

### createArea()

Parameters:
 - area: any

Create an area and stock it on the database.

Return 0 if the area is created, or the text error otherwise.

### deleteArea()

Parameters:
 - id: string

Delete an area from the database.

Return 0 if the area is correctly deleted, the text error otherwise.

### getAreas()

No parameters.

Return the areas from the user.

### logout()

Parameters:
 - navigation: any

Logout the user by forgetting the token.

### getVar()

Parameters:
 - key: string

Return the variable 'key' stocked in AsyncStorage.

### setVar()

Parameters:
 - key: string
 - value: string

Set the variable 'key' with 'value' in AsyncStorage.

### removeVar()

Parameters:
 - key: string

Remove the variable 'key' stocked in AsyncStorage.
