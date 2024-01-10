import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import TextBox from '../app/shared/components/textbox';
import AreaButton from '@components//button';
import { googleSignInFunc, register, removeVar } from './api';

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
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
              <TextBox placeholder="Username" onChangeText={setUsername} value={username} hideText={false} />
              <TextBox placeholder="E-mail" onChangeText={setEmail} value={email} hideText={false} autocomplete="email" />
              <TextBox placeholder="Password" onChangeText={setPassword} value={password} hideText={true} autocomplete="password" />
              <AreaButton title="Register" onPress={() => {
                register(username, email, password, navigation);
                removeVar('action');
                removeVar('reaction');
              }} backgroundColor='#E88741' textColor='#1F1F1F' activeOpacity={0.5} />
              <View style={styles.bar} />
              <AreaButton title="Register with Google" onPress={async () => {
                if (await googleSignInFunc() === true) {
                  navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
                }
                removeVar('action');
                removeVar('reaction');
              }} backgroundColor='#F5F5F5' textColor='#00000054' icon={require('@ressources/google.png')} activeOpacity={0.7} />
              <Text onPress={() => { navigation.navigate('Login') }} style={{ color: '#1F1F1F', fontSize: 16, alignSelf: 'center', marginTop: '5%' }}>Already an account ? Login Here</Text>
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
