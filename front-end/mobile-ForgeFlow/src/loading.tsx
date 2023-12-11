import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {Animated} from 'react-native';
import { Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { useLockOrientationPortrait } from './hooks/useOrientation';

const LoadingScreen = () => {
    const navigation = useNavigation();
    // useLockOrientationPortrait();

    const spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.timing(
        spinValue,
    {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true  // To make use of native driver for performance
    }
    ).start()

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '360deg']
    });

    setTimeout(() => {
        navigation.navigate('Login');
        navigation.reset({index: 0, routes: [{ name: 'Login' }]});
    }, 2500);

    return (
        <View style={styles.all}>
            <Animated.Image
                style={{transform: [{rotate: spin}], width: 150, height: 150}}
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
  
  export default LoadingScreen;
  