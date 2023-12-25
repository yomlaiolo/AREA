import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import AreaButton from "@components//button";
import TextBox from "@components//textbox";

export default function ChangePasswordPage({ navigation }: any) {
  const [actualPassword, setActualPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');
  const separator = <View style={styles.separator} />;

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
        <View style={styles.form} >
          <TextBox hideText={true} placeholder="Actual password" backgroundColor="white" borderColor="#E2E2E2" value={actualPassword} onChangeText={(text: string) => { setActualPassword(text) }} />
          <TextBox hideText={true} placeholder="New password" backgroundColor="white" borderColor="#E2E2E2" value={newPassword} onChangeText={(text: string) => { setNewPassword(text) }} />
          <TextBox hideText={true} placeholder="New password confirmation" backgroundColor="white" borderColor="#E2E2E2" value={newPasswordConfirmation} onChangeText={(text: string) => { setNewPasswordConfirmation(text) }} />
          <AreaButton backgroundColor="#CECECE" textColor="black" title="Confirm password change" onPress={() => { }} />
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
  form: {
    width: '90%',
    height: '100%',
    alignItems: "center",
    marginTop: 50,
  },
});
