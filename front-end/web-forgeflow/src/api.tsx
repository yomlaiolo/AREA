const API = 'http://localhost:8080'

export async function login(email: string, password: string, navigate: Function) {

  fetch(API + '/auth/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
    .then(response => {
      if (response.status === 200)
        return response.json();
      else if (response.status === 401)
        return null;
    })
    .then(async data => {
      if (data && data.access_token) {
        let token = data.access_token;
        await setToken(token);
        navigate('/flows');
      } else
        window.alert("Error: Unauthorized - invalid credentials");
    })
    .catch((error) => {
      console.error('Login Error:', error);
    });
}

export async function sendGoogleLogin(navigation: any, infos: any) {
  fetch(API + '/auth/google-access-token', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      "access_token": infos,
    })
  })
    .then(response => {
      if (response.status === 200)
        return response.json();
      else if (response.status === 401)
        return null;
    })
    .then(async data => {
      if (data && data.access_token) {
        let token = data.access_token;
        await setVar('token', token);
        navigation('/flows');
      } else
        window.alert("Error: Unauthorized - invalid credentials");
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

export async function signInWithGithub(accessToken_github: string) {
  const token = await getToken();
  fetch(API + '/github/token', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }),
    body: JSON.stringify({
      token: accessToken_github,
    }),
  })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 401) {
        console.log("Unauthorized - invalid credentials");
        return null;
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

export async function register(username: string, email: string, password: string, navigate: Function) {
  fetch(API + '/auth/register', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      "username": username,
      "firstname": "empty",
      "lastname": "empty",
      "email": email,
      "password": password,
    })
  })
    .then(response => {
      if (response.status === 201) {
        login(email, password, navigate);
      } else if (response.status === 400) {
        window.alert("Error: Bad Request - invalid data");
      } else if (response.status === 406) {
        window.alert("Error: Not Acceptable - invalid email / password");
      } else if (response.status === 409) {
        window.alert("Error: User or email already used");
      }
    })
    .catch((error) => {
      console.error('Register Error:', error);
    });
}


export async function userInfo() {
  const token = await getToken();
  var username: string = '';
  var email: string = '';

  try {
    const response = await fetch(API + '/users', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      username = data.username;
      email = data.email;
      setVar('username', username);
      setVar('email', email);
    } else if (response.status === 401) {
      removeVar('username');
      removeVar('email');
      console.log('Unauthorized - invalid credentials');
    }
  } catch (error) {
    console.error('UserInfo Error:', error);
  }
  return { username, email };
}

export async function modifyProfile(username: string, email: string, password: string) {
  const token = await getToken();

  try {
    const response = await fetch(API + '/auth/change-profile', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    if (response.status === 200) {
      setVar('username', username);
      setVar('email', email);
      return 0;
    } else if (response.status === 400) {
      return "Password is required / Username or email is required";
    } else if (response.status === 401) {
      return "Unauthorized - invalid credentials";
    } else if (response.status === 406) {
      return "Email not valid";
    }
  } catch (error) {
    console.error('ModifyProfile Error:', error);
  }
  return "Unknown error, maybe the server is down, or the username or the email is already used";
}

export async function modifyPassword(oldPassword: string, newPassword: string) {
  const token = await getToken();

  try {
    const response = await fetch(API + '/auth/change-password', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
    if (response.status === 200) {
      return 0;
    } else if (response.status === 400) {
      return "All fields are required";
    } else if (response.status === 401) {
      return "Unauthorized - invalid credentials";
    } else if (response.status === 406) {
      return "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number";
    }
  } catch (error) {
    console.error('Password Error:', error);
  }
  return "Unknown error, maybe the server is down";
}

export async function getAreas() {
  const token = await getToken();
  var areas: any[] = [];

  if (!token) {
    console.log('No token found');
    return areas;
  }
  try {
    const response = await fetch(API + '/area', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'x-www-form-urlencoded',
        Authorization: 'Bearer ' + token,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      areas = data;
    } else if (response.status === 401) {
      console.log('Unauthorized - invalid credentials');
    }
  } catch (error) {
    console.log('Error:', JSON.stringify(error));
  }
  return areas;
}

export async function getToken() {
  const token = localStorage.getItem('token');
  return token;
}

export async function setToken(token: string) {
  localStorage.setItem('token', token);
}

export async function logout(navigate: any) {
  localStorage.removeItem('token');
  navigate('/');
}

export async function setVar(key: string, value: string) {
  localStorage.setItem(key, value);
}

export async function getVar(key: string) {
  const value = localStorage.getItem(key);
  return value;
}

export async function removeVar(key: string) {
  localStorage.removeItem(key);
}

export async function createArea(area: any) {
  const token = await getToken();

  if (token === null)
    return "Not connected";
  try {
    const response = await fetch(API + '/area/create', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
      body: JSON.stringify(area),
    });
    if (response.status === 201) {
      return 0;
    } else if (response.status === 400) {
      return "Invalid data";
    }
  } catch (error) {
    console.log('Error:', error);
  }
  return "Unknown error, maybe the server is down";
}