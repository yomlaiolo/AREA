import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AreaButton from "@components//button";
import TextBox from "@components//textbox";
import { getVar, modifyProfile } from "./api";
import { showToast } from "./utils";

async function processChanges(navigation: any, username: string, email: string, password: string) {
  if (username === '' && email === '') {
    Alert.alert("Error", "You must change at least one of the two fields.");
    return;
  }
  if (password === '') {
    Alert.alert("Error", "You must enter your password.");
    return;
  }
  if (username === '')
    username = await getVar('username') as string;
  if (email === '')
    email = await getVar('email') as string;
  var response = await modifyProfile(username, email, password);
  if (response === 0) {
    showToast("Profile changed successfully.");
    navigation.goBack();
  } else {
    Alert.alert("Error", response?.toString());
  }
}

export default function ChangeProfilePage({ navigation }: any) {
  const [newUsername, setnewUsername] = useState<string>('');
  const [newEmail, setnewEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [actualUsername, setActualUsername] = useState<string>('');
  const [actualEmail, setActualEmail] = useState<string>('');

  const separator = <View style={styles.separator} />;
  const explanations = "You can change your username and your email. You can't change your password here. " +
    "If you want to change your password, please go to the \"Modify password\" page.\n\nYou can change only one of the two fields, or both.\n\n" +
    "You need your password to confirm the changes.";

  useEffect(() => {
    getVar('username').then(usernameValue => { setActualUsername(usernameValue as string); })
    getVar('email').then(emailValue => { setActualEmail(emailValue as string); })
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.all}>
        <View style={styles.top} >
          <TouchableOpacity onPress={() => { navigation.goBack() }} >
            <Image style={styles.chevron} source={require('@ressources/chevronL.png')} />
          </TouchableOpacity>
          <Text style={styles.title} >Change profile</Text>
        </View>
        {separator}
        <View style={styles.explain}>
          <Text style={{ color: 'black', fontSize: 14, marginTop: 20, textAlign: 'justify' }} >{explanations}</Text>
        </View>
        <View style={styles.form} >
          <TextBox placeholder={"New username. (" + actualUsername + ")"} backgroundColor="white" borderColor="#E2E2E2" value={newUsername} onChangeText={(text: string) => { setnewUsername(text) }} />
          <TextBox placeholder={"New email. (" + actualEmail + ")"} backgroundColor="white" borderColor="#E2E2E2" value={newEmail} onChangeText={(text: string) => { setnewEmail(text) }} />
          <TextBox hideText={true} placeholder="Password" backgroundColor="white" borderColor="#E2E2E2" value={password} onChangeText={(text: string) => { setPassword(text) }} />
          <AreaButton backgroundColor="#CECECE" textColor="black" title="Confirm profile change" onPress={() => { processChanges(navigation, newUsername, newEmail, password) }} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  all: {
    backgroundColor: "#F5F5F5",
    height: '100%',
    alignItems: "center",
  },
  top: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F1F1F",
    marginLeft: 10,
  },
  separator: {
    width: '92%',
    height: 1,
    backgroundColor: "#CECECE",
  },
  chevron: {
    width: 30,
    height: 30,
  },
  explain: {
    width: '90%',
  },
  form: {
    width: '90%',
    alignItems: "center",
    marginTop: 30,
  },
});
