import AreaButton from "@components//button";
import Flow from "@components//flow";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getToken() {
  const token = await AsyncStorage.getItem('token');
  return token;
}

export default function AreaPage({ navigation }: any) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken().then(tokenValue => {
      setToken(tokenValue);
      console.log(tokenValue);
    });
  }, []);

  let names = [{
    key: '1',
    name: token,
    desc: 'Create your own flows',
  }, {
    key: '2',
    name: 'Profile',
    desc: 'Manage your account',
  }, {
    key: '3',
    name: 'Area',
    desc: 'Manage your flows',
  }, {
    key: '4',
    name: 'Settings',
    desc: 'Manage your settings',
  }, {
    key: '5',
    name: 'Logout',
    desc: 'Logout from your account',
  }];

  return (
    <View style={styles.all} >
      <FlatList style={styles.flat} contentContainerStyle={styles.list} data={names} renderItem={(names) => {
        return (
          <Flow
            key={names.item.key}
            onPress={() => { }}
            title={names.item.name}
            description={names.item.desc}
            icons={[require('@ressources/google.png'), require('@ressources/spotify.png')]}
          />
        )
      }} />
      <View style={styles.button} >
        <AreaButton title="Create a new flow" onPress={() => { navigation.jumpTo('Forge') }} backgroundColor='#E88741' textColor='#1F1F1F' activeOpacity={0.5} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  all: {
    width: '100%',
    height: '100%',
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  flat: {
    width: '100%',
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  button: {
    width: '100%',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5'
  }
});
