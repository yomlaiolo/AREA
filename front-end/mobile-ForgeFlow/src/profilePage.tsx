import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AreaButton from "@components//button";
import { getVar, logout, userInfo } from "./api";
import Switch from "@components//switch";

export default function ProfilePage({ navigation }: any) {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    userInfo().then(() => {
      getVar('username').then(usernameValue => { setUsername(usernameValue); })
      getVar('email').then(emailValue => { setEmail(emailValue); })
    });
  });

  return (
    <View style={styles.all} >
      <View style={{ width: '100%' }} >
        <Text style={styles.account} >My account</Text>
      </View>
      <View style={styles.profile} >
        <Image style={styles.profilePicture} source={require('@ressources/logo.png')} />
        <View style={{ marginLeft: 20, marginTop: 20 }} >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1F1F1F" }} >{username}</Text>
          <Text style={{ fontSize: 15, color: "#E88741" }} >{email}</Text>
        </View>
      </View>
      <View style={styles.settings} >
        <View style={styles.settingCase} >
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }} >Notifications</Text>
          <Switch backgroundColor="#E7E7E7" offColor="#CECECE" onColor="#E88741" onSwitch={() => { }} status={true} />
        </View>
        <View style={styles.separator} />
        <View style={styles.settingCase} >
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }} >Modify email</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('ModifyEmail') }} >
            <Image style={styles.chevron} source={require('@ressources/chevron.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.settingCase} >
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }} >Modify password</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('ModifyPassword') }} >
            <Image style={styles.chevron} source={require('@ressources/chevron.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.bottom} >
          <AreaButton backgroundColor="red" title="Disconnect" onPress={() => { logout(navigation) }} />
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  all: {
    backgroundColor: "#F5F5F5",
    height: '100%',
    alignItems: "center",
  },
  account: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F1F1F",
    marginLeft: 20,
    marginTop: 20,
  },
  profile: {
    width: '100%',
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: "#707070",
  },
  settings: {
    height: '100%',
    width: '90%',
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    marginTop: 50,
  },
  settingCase: {
    width: '98%',
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: "#CECECE",
  },
  chevron: {
    width: 30,
    height: 30,
  },
  bottom: {
    width: '100%',
    height: '40%',
    justifyContent: "flex-end",
  },
});
