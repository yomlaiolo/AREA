import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>HOME</Text>
      <Button title="Va conter" onPress={() => navigation.navigate("Other_page")} />
    </View>
  )
}
