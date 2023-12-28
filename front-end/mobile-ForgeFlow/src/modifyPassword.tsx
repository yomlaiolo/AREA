import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AreaButton from "@components//button";
import TextBox from "@components//textbox";
import { showToast } from "./utils";
import { modifyPassword } from "./api";

async function processChanges(navigation: any, oldPassword: string, newPassword: string, newPasswordConfirmation: string) {
  if (oldPassword === '' || newPassword === '' || newPasswordConfirmation === '') {
    Alert.alert("Error", "You must fill all the fields.");
    return;
  }
  if (newPassword !== newPasswordConfirmation) {
    Alert.alert("Error", "The new password and its confirmation must be the same.");
    return;
  }
  var response = await modifyPassword(oldPassword, newPassword);
  if (response === 0) {
    showToast("Password changed successfully.");
    navigation.goBack();
  } else {
    Alert.alert("Error", response?.toString());
  }
}

export default function ChangePasswordPage({ navigation }: any) {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');

  const separator = <View style={styles.separator} />;
  const explanations = "You can change your password here. You need to enter your actual password, and then your new password twice.\n\n" +
    "Your new password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.";

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.all}>
        <View style={styles.top} >
          <TouchableOpacity onPress={() => { navigation.goBack() }} >
            <Image style={styles.chevron} source={require('@ressources/chevronL.png')} />
          </TouchableOpacity>
          <Text style={styles.title} >Modify password</Text>
        </View>
        {separator}
        {separator}
        <View style={styles.explain}>
          <Text style={{ color: 'black', fontSize: 14, marginTop: 20, textAlign: 'justify' }} >{explanations}</Text>
        </View>
        <View style={styles.form} >
          <TextBox hideText={true} placeholder="Actual password" backgroundColor="white" borderColor="#E2E2E2" value={oldPassword} onChangeText={(text: string) => { setOldPassword(text) }} />
          <TextBox hideText={true} placeholder="New password" backgroundColor="white" borderColor="#E2E2E2" value={newPassword} onChangeText={(text: string) => { setNewPassword(text) }} />
          <TextBox hideText={true} placeholder="New password confirmation" backgroundColor="white" borderColor="#E2E2E2" value={newPasswordConfirmation} onChangeText={(text: string) => { setNewPasswordConfirmation(text) }} />
          <AreaButton backgroundColor="#CECECE" textColor="black" title="Confirm password change" onPress={() => { processChanges(navigation, oldPassword, newPassword, newPasswordConfirmation) }} />
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
    height: '100%',
    alignItems: "center",
    marginTop: 50,
  },
});
