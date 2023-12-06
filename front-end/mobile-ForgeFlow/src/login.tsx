import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import TextBox from '../app/shared/components/textbox';
import { useNavigation } from '@react-navigation/native';
import AreaButton from '@components//button';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    // <KeyboardAvoidingView behavior='position'>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Image style={{width: '100%', height:'100%', position:'absolute'}} source={require('@ressources/background_home.png')} />
            <View style={styles.container}>
              <Text style={{color: 'black', fontSize: 60, fontWeight: 'bold', fontFamily: 'serif'}}>ForgeFlow</Text>
              <Image style={{width: 150, height: 150, marginTop: '10%'}} source={require('@ressources/logo.png')} />
                <KeyboardAvoidingView behavior='position' style={{backgroundColor: 'transparent', width: '100%', paddingHorizontal: '10%'}}>
                  <TextBox
                      placeholder="E-mail"
                      onChangeText={setEmail}
                      value={email}
                      hideText={false}
                      autocomplete="email"
                  />
                  <TextBox
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    hideText={true}
                    autocomplete="password"
                  />
                  <AreaButton
                    title="Login"
                    onPress={() => {}}
                    backgroundColor='#E88741'
                    textColor='#1F1F1F'
                  />
                </KeyboardAvoidingView>
            </View>
        </View>
      </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
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
});

export default LoginScreen;
