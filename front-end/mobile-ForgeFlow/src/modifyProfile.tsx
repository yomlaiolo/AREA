import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import AreaButton from "@components//button";
import TextBox from "@components//textbox";

export default function ChangeProfilePage({ navigation }: any) {
  const [newUsername, setnewUsername] = useState<string>('');
  const [newEmail, setnewEmail] = useState<string>('');

  const separator = <View style={styles.separator} />;
  const explanations = "You can change your username and your email. You can't change your password here. " +
    "If you want to change your password, please go to the \"Modify password\" page.\n\nYou can change only one of the two fields, or both.";

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
          <TextBox placeholder="New username" backgroundColor="white" borderColor="#E2E2E2" value={newUsername} onChangeText={(text: string) => { setnewUsername(text) }} />
          <TextBox placeholder="New email" backgroundColor="white" borderColor="#E2E2E2" value={newEmail} onChangeText={(text: string) => { setnewEmail(text) }} />
          <AreaButton backgroundColor="#CECECE" textColor="black" title="Confirm profile change" onPress={() => { }} />
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
