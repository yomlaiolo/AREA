import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import TextBox from '../app/shared/components/textbox';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Image style={{width: '100%', height:'100%', position:'absolute'}} source={require('@ressources/background_home.png')} />
      <ScrollView style={styles.scroll} bounces={true}>
        <View style={styles.container}>
          <Text style={{color: 'black', fontSize: 60, fontWeight: 'bold', fontFamily: 'serif'}}>ForgeFlow</Text>
          <Image style={{width: 150, height: 150, marginTop: '10%'}} source={require('@ressources/logo.png')} />
          <View style={{backgroundColor: 'transparent', width: '100%', paddingHorizontal: '10%'}}>
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
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%',
  },
});

export default LoginScreen;
