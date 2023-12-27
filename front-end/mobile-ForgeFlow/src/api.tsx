import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID } from '@env';
import { authorize } from 'react-native-app-auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
  offlineAccess: true,
  hostedDomain: '',
  scopes: ['profile', 'email'],
});

export async function googleSignInFunc(navigation: any) {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    sendGoogleLogin(navigation, userInfo);
  } catch (error: any) {
    console.error(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  } finally {

  }
};

export async function sendGoogleLogin(navigation: any, infos: any) {
  fetch(API + '/auth/google', {
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
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else
        Alert.alert("Error", "Unauthorized - invalid credentials");
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
      console.error('Error:', error);
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
      console.error('Error:', error);
    });
}

export async function userInfo() {
  const token = await AsyncStorage.getItem('token');

  fetch(API + '/users', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }),
  })
    .then(response => {
      if (response.status === 200)
        return response.json();
      else if (response.status === 401)
        return null;
    })
    .then(data => {
      if (data) {
        setVar('username', data.username);
        setVar('email', data.email);
      } else {
        removeVar('username');
        removeVar('email');
        console.log('Unauthorized - invalid credentials');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
  const githubToken = await authorize(config);

  fetch(API + '/github/token', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      token: githubToken.accessToken,
    }),
  })
    .then(response => {
      console.log('Front: Response', response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function getVar(key: string) {
  const token = await AsyncStorage.getItem(key);
  return token;
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
