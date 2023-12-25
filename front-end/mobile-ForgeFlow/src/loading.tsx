import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import { Easing } from 'react-native';
import { getVar } from './api';

export default function LoadingScreen({ navigation }: any) {
  const spinValue = new Animated.Value(0);
  const [token, setToken] = useState('');
  useEffect(() => {
    getVar('token').then((value) => setToken(value || ''));
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
