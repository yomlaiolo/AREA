import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID } from '@env';
import { authorize } from 'react-native-app-auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
  offlineAccess: true,
  hostedDomain: '',
  scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive'],
});

export async function googleSignInFunc() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return await sendGoogleLogin(userInfo);
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

export async function sendGoogleLogin(infos: any) {
  try {
    const response = await fetch(API + '/auth/google', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        "user": infos.user,
        "server_auth_code": infos.serverAuthCode,
        "id_token": infos.idToken,
      })
    })
    if (response.status === 200) {
      const data = await response.json();
      let token = data.access_token;
      await setVar('token', token);
      return true;
    } else if (response.status === 401) {
      console.log("Unauthorized - invalid credentials");
      return false;
    }
  } catch (error) {
    console.log('Error:', error);
    return false;
  }
}

export async function login(email: string, password: string, navigation: any) {
  fetch(API + '/auth/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(response => {
      if (response.status === 200) return response.json();
      else if (response.status === 401) return null;
    })
    .then(async data => {
      if (data && data.access_token) {
        let token = data.access_token;
        await setVar('token', token);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else Alert.alert('Error', 'Unauthorized - invalid credentials');
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

export async function register(
  username: string,
  email: string,
  password: string,
  navigation: any,
) {
  fetch(API + '/auth/register', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      username: username,
      firstname: 'empty',
      lastname: 'empty',
      email: email,
      password: password,
    }),
  })
    .then(response => {
      if (response.status === 201) {
        login(email, password, navigation);
      } else if (response.status === 400) {
        Alert.alert('Error', 'Bad Request - invalid data');
      } else if (response.status === 406) {
        Alert.alert('Error', 'Not Acceptable - invalid email / password');
      } else if (response.status === 409) {
        Alert.alert('Error', 'User or email already used');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

export async function userInfo() {
  const token = await getVar('token');
  var username: string = '';
  var email: string = '';

  if (!token) {
    console.log('No token found');
    return { username, email };
  }
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
    console.log('Error:', error);
  }
  return { username, email };
}

export async function isGoogleLoggedIn() {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.log('No token found');
    return false;
  }
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
      return data.google_connected;
    } else if (response.status === 401) {
      return false;
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

export async function isGithubLoggedIn() {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.log('No token found');
    return false;
  }
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
      return data.github_connected;
    } else if (response.status === 401) {
      return false;
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

export async function modifyProfile(username: string, email: string, password: string) {
  const token = await AsyncStorage.getItem('token');

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
    } else if (response.status === 409) {
      return "Username or email already used";
    }
  } catch (error) {
    console.log('Error:', error);
  }
  return "Unknown error, maybe the server is down";
}

export async function modifyPassword(oldPassword: string, newPassword: string) {
  const token = await AsyncStorage.getItem('token');

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
    console.log('Error:', error);
  }
  return "Unknown error, maybe the server is down";
}

const config = {
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  redirectUrl: 'myapp://callback',
  scopes: ['user', 'repo'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/' +
      GITHUB_CLIENT_ID,
  },
};

export async function signInWithGithub() {
  const token = await getVar('token');
  const githubToken = await authorize(config);

  console.log(githubToken);
  if (!githubToken) {
    console.log('No token found');
    return;
  }
  setVar('githubToken', githubToken.accessToken);
  fetch(API + '/github/token', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }),
    body: JSON.stringify({
      token: githubToken.accessToken,
    }),
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Github token saved');
        return response.json();
      } else if (response.status === 401) {
        console.log('Unauthorized - invalid credentials');
        return null;
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

export async function getRepo() {
  const token = await getVar('githubToken');
  const repos: any[] = [];
  if (!token) {
    console.log('No token found');
    return;
  }

  try {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      data.forEach((item: any) => {
        repos.push(item.name);
      });
    } else if (response.status === 401) {
      console.log('Unauthorized - invalid credentials');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return repos;
}

export async function createArea(area: any) {
  const token = await AsyncStorage.getItem('token');

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

export async function deleteArea(id: string) {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await fetch(API + '/area/delete/' + id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    });
    if (response.status === 200) {
      return 0;
    } else if (response.status === 404) {
      return "Area not found";
    }
  } catch (error) {
    console.log('Error:', error);
  }
  return "Unknown error, maybe the server is down";
}

export async function getAreas() {
  const token = await AsyncStorage.getItem('token');
  var areas: any[] = [];

  if (!token) {
    console.log('No token found');
    return areas;
  }
  try {
    const response = await fetch(API + '/area', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
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
    console.log('Error:', error);
  }
  return areas;
}

export async function getVar(key: string) {
  const myVar = await AsyncStorage.getItem(key);
  return myVar;
}

export async function setVar(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function removeVar(key: string) {
  await AsyncStorage.removeItem(key);
}

export async function logout(navigation: any) {
  await AsyncStorage.removeItem('token');
  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
}
