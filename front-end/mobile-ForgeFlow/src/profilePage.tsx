import React from "react";
import { Text, View } from "react-native";
import AreaButton from "@components//button";
import { logout } from "./api";

export default function ProfilePage({ navigation }: any) {
  return (
    <View style={{ backgroundColor: 'green' }} >
      <Text>Profile Page</Text>
      <AreaButton backgroundColor="red" title="Disconnect" onPress={() => { logout(navigation) }} />
    </View>
  )
};
