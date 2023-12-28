import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Loading from './src/loading';
import LoginScreen from './src/login';
import RegisterScreen from './src/register';
import Home from 'src/home';
import ModifyPasswordPage from 'src/modifyPassword';
import ModifyProfilePage from 'src/modifyProfile';
import ActionPage from 'src/actionPage';
import ReactionPage from 'src/reactionPage';
import { useLockOrientationPortrait } from 'src/utils';

const Stack = createNativeStackNavigator();

export default function App() {
  useLockOrientationPortrait();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={Loading} options={{ title: 'Welcome', headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register', headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="ModifyPassword" component={ModifyPasswordPage} options={{ title: 'Change password', headerShown: false }} />
        <Stack.Screen name="ModifyProfile" component={ModifyProfilePage} options={{ title: 'Change profile', headerShown: false }} />
        <Stack.Screen name="Action" component={ActionPage} options={{ title: 'Action', headerShown: false }} />
        <Stack.Screen name="Reaction" component={ReactionPage} options={{ title: 'Reaction', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
