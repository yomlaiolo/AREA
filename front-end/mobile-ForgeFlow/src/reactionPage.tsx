import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { setVar } from "./api";
import { reactions } from "./area";

async function press(navigation: any, item: any) {
  setVar('reaction', item.id.toString());
  navigation.goBack();
}

export default function ReactionPage({ navigation }: any) {
  return (
    <View style={styles.all}>
      <View style={styles.top} >
        <TouchableOpacity onPress={() => { navigation.goBack() }} >
          <Image style={styles.chevron} source={require('@ressources/chevronL.png')} />
        </TouchableOpacity>
        <Text style={styles.title} >Select a reaction</Text>
      </View>
      <View style={styles.separator} />
      <FlatList style={{
        width: '100%',
        height: '100%',
        marginTop: 20,
      }}
        numColumns={2} contentContainerStyle={styles.item} data={reactions.filter(item => item.id !== 0)} renderItem={({ item }) =>
        (
          <TouchableOpacity onPress={() => { press(navigation, item) }} style={[styles.reaction, { backgroundColor: item.backgroundColor }]} activeOpacity={0.5} >
            <Image style={{ width: 100, height: 100, marginTop: 5 }} source={item.icon} />
            <Text style={{ color: item.textColor, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }} >{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
      />
    </View>
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
  container: {
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  item: {
    justifyContent: "space-around",
    paddingHorizontal: '2.5%',
  },
  reaction: {
    width: '45%',
    height: 160,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CECECE",
    marginBottom: 20,
    marginHorizontal: '2.5%',
  },
})
