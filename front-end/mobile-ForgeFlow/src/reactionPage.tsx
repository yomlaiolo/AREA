import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getVar, isGithubLoggedIn, isGoogleLoggedIn, setVar, signInWithGithub } from "./api";
import { reactions } from "./area";
import { useFocusEffect } from "@react-navigation/native";

async function press(navigation: any, item: any) {
  setVar('reaction', item.id.toString());
  if (item.redirection === 'github') {
    if (await isGithubLoggedIn() === false) {
      await signInWithGithub();
    }
    navigation.navigate('SetGithub', { idx: await getVar('action'), name: item.name });
  } else if (item.redirection === 'google') {
    if (await isGoogleLoggedIn() === false) {
      console.log('not logged in');
      return;
    }
    navigation.navigate('SetEmail', { idx: await getVar('action') });
  } else if (item.redirection === 'notification') {
    navigation.navigate('SetNotification', { idx: await getVar('action') });
  } else if (item.redirection === 'openai') {
    navigation.navigate('SetOpenAI', { idx: await getVar('action'), name: item.name });
  }
}

export default function ReactionPage({ navigation }: any) {
  const fetchData = async () => {
    const reactionValue = await getVar('reactionValue');
    if (reactionValue) {
      navigation.goBack();
    }
  };
  fetchData();
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

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
