import AreaButton from "@components//button";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ForgePage() {
  const [actionStatus, setActionStatus] = useState<boolean>(false);
  const [reactionStatus, setReactionStatus] = useState<boolean>(false);

  return (
    <View style={styles.all} >
      <View style={{ width: '100%' }} >
        <Text style={styles.account} >Let's Forge !</Text>
      </View>
      <View style={styles.forge} >
        <TouchableOpacity onPress={() => { setActionStatus(!actionStatus); setReactionStatus(false) }} style={styles.action} activeOpacity={0.5} >
          <Image style={{ width: 50, height: 50 }} source={require('@ressources/hammer_white.png')} />
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }} >Add an Action</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        {!actionStatus ? (
          <View style={styles.disabled} />
        ) : (
          <TouchableOpacity onPress={() => { setReactionStatus(!reactionStatus) }} style={styles.reaction} activeOpacity={0.5} >
            <Image style={{ width: 50, height: 50 }} source={require('@ressources/hammer_black.png')} />
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }} >Add a Rection</Text>
          </TouchableOpacity>
        )}
        {reactionStatus &&
          <View style={styles.bottom} >
            <AreaButton backgroundColor="#1F1F1F" activeOpacity={0.5} textColor="white" title="Forge this Flow" onPress={() => { console.log('Forge this Flow') }} />
          </View>
        }
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
  forge: {
    width: '100%',
    backgroundColor: "#F5F5F5",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    paddingTop: 20,
  },
  action: {
    width: '90%',
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    paddingHorizontal: '20%',
  },
  reaction: {
    width: '90%',
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E88741",
    borderRadius: 12,
    paddingHorizontal: '20%',
  },
  separator: {
    marginVertical: 10,
    width: 3,
    height: 40,
    backgroundColor: "#1F1F1F",
  },
  disabled: {
    width: '90%',
    height: 80,
    backgroundColor: "#CECECE",
    borderRadius: 12,
  },
  bottom: {
    width: '90%',
    height: '62%',
    justifyContent: "flex-end",
  },
});
