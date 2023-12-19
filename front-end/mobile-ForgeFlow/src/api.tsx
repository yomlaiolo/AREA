import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'http://10.15.191.104:8080'

export async function login(email: string, password: string, navigation: any) {
    fetch(API + '/auth/login', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
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
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            } else
                Alert.alert("Error", "Unauthorized - invalid credentials");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function register(username: string, email: string, password: string, navigation: any) {
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
                login(email, password, navigation);
            } else if (response.status === 400) {
                Alert.alert("Error", "Bad Request - invalid data");
            } else if (response.status === 406) {
                Alert.alert("Error", "Not Acceptable - invalid email / password");
            } else if (response.status === 409) {
                Alert.alert("Error", "User or email already used");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function getToken() {
    const token = await AsyncStorage.getItem('token');
    return token;
}

export async function setToken(token: string) {
    await AsyncStorage.setItem('token', token);
}

export async function logout(navigation: any) {
    await AsyncStorage.removeItem('token');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
}