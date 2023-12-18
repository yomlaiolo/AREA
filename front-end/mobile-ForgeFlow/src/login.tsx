import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import TextBox from '../app/shared/components/textbox';
import AreaButton from '@components//button';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function login(email: string, password: string, navigation: any) {
  let token = "";

  fetch('http://10.15.191.104:8080/auth/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
    .then(response => response.json())
    .then(async data => {
      if (data.access_token) {
        token = data.access_token;
        console.log("Token: " + token);
        await AsyncStorage.setItem('token', token);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else {
        Alert.alert("Error", "Bad Request - invalid data");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'white' }}>
        <Image style={{ width: '100%', height: '100%', position: 'absolute' }} source={require('@ressources/background_home.png')} />
        <KeyboardAvoidingView behavior='position' style={{ width: '100%', height: '100%' }}>
          <View style={styles.container}>
            <Text style={{ color: 'black', fontSize: 60, fontWeight: 'bold', fontFamily: 'serif' }}>ForgeFlow</Text>
            <Image style={{ width: 150, height: 150, marginTop: '10%' }} source={require('@ressources/logo.png')} />
            <View style={styles.utils}>
              <TextBox placeholder="E-mail" onChangeText={setEmail} value={email} hideText={false} autocomplete="email" />
              <TextBox placeholder="Password" onChangeText={setPassword} value={password} hideText={true} autocomplete="password" />
              <AreaButton title="Login" onPress={() => { login(email, password, navigation) }} backgroundColor='#E88741' textColor='#1F1F1F' activeOpacity={0.5} />
              <View style={styles.bar} />
              <AreaButton title="Sign in with Google" onPress={() => { }} backgroundColor='#F5F5F5' textColor='#00000054' icon={require('@ressources/google.png')} activeOpacity={0.7} />
              <Text onPress={() => { navigation.navigate('Register') }} style={{ color: '#1F1F1F', fontSize: 16, alignSelf: 'center', marginTop: '30%' }}>No account yet ? Register Here</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingTop: '20%',
  },
  utils: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    paddingHorizontal: '10%',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: '90%',
    height: 3,
    backgroundColor: '#1F1F1F',
    marginVertical: '2%',
    borderRadius: 100,
  },
  bottom: {
    height: 10,
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '10%',
    marginBottom: '10%',
  }
});
