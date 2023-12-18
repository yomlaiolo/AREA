import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'http://10.15.191.104:8080/'

export async function FetchWithAccessToken(path: any) {
    try {
        const response = await fetch(API + path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('access_token'),
            },
        });
        return response;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export async function FetchWithoutAccessToken(path: any, bodyData: any) {
    try {
        const response = await fetch(API + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: bodyData
        });
        return response;
    } catch (err) {
        console.error(err);
    }
}
