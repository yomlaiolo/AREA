import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import { Easing } from 'react-native';
import { getVar, removeVar, userInfo } from './api';

export default function LoadingScreen({ navigation }: any) {
  const spinValue = new Animated.Value(0);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from AsyncStorage, if present, get the userInfos to check if the API token is still valid and that the API is still up
    removeVar('cronTime');
    removeVar('githubRepo');
    removeVar('action');
    removeVar('reaction');
    getVar('token').then(async (value) => {
      if (value !== null) {
        userInfo().then((uInfo) => {
          if (uInfo !== null && uInfo !== undefined && uInfo.username !== '' && uInfo.email !== '') {
            setToken(value);
          }
          else {
            removeVar('token');
            removeVar('username');
            removeVar('email');
          }
        });
      } else {
        removeVar('token');
        removeVar('username');
        removeVar('email');
      }
    });
  }, []);

  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }
  ).start()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '360deg']
  });

  setTimeout(() => {
    // Autologin if token is present, else go to login page
    if (token !== '')
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    else
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, 1500);

  return (
    <View style={styles.all}>
      <Animated.Image
        style={{ transform: [{ rotate: spin }], width: 150, height: 150 }}
        source={require('@ressources/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  all: {
    backgroundColor: "#FFFFFF",
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  }
});
