import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import { Easing } from 'react-native';

export default function LoadingScreen({ navigation }: any) {
  const spinValue = new Animated.Value(0);

  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true
    }
  ).start()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '360deg']
  });

  setTimeout(() => {
    navigation.navigate('Login');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, 200);

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
