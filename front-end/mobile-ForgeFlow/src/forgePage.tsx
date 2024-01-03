import AreaButton from "@components//button";
import React, { useState } from "react";
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { getVar, removeVar } from "./api";
import { useFocusEffect } from "@react-navigation/native";
import { actions, reactions } from "./area";
import { showToast } from "./utils";
import TextBox from "@components//textbox";

async function forge(name: string, repo: string, cronTime: string) {
  const actionId = await getVar('action');
  const reactionId = await getVar('reaction');
  const action = actions[parseInt(actionId as string)];
  const reaction = reactions[parseInt(reactionId as string)];

  if (action.redirection === 'github' && repo !== '') {
    console.log(name + ', When ' + action.name + ' on ' + repo + ' then ' + reaction.name);
    showToast(name + ', When ' + action.name + ' on ' + repo + ' then ' + reaction.name);
  } else if (action.redirection === 'cron') {
    if (action.name === 'Every [x] time' && cronTime !== '') {
      console.log(name + ', Every ' + cronTime + ' then ' + reaction.name);
      showToast(name + ', Every ' + cronTime + ' then ' + reaction.name);
    } else if (action.name === 'At [hour] on [day]' && cronTime !== '') {
      console.log(name + ', At ' + cronTime + ' then ' + reaction.name);
      showToast(name + ', At ' + cronTime + ' then ' + reaction.name);
    }
  } else {
    console.log(name + ', When ' + action.name + ' then ' + reaction.name);
    showToast(name + ', When ' + action.name + ' then ' + reaction.name);
  }
  removeVar('action');
  removeVar('reaction');
  return 0;
}

export default function ForgePage({ navigation }: any) {
  const [actionStatus, setActionStatus] = useState<boolean>(false);
  const [reactionStatus, setReactionStatus] = useState<boolean>(false);
  const [actionSelected, setActionSelected] = useState<any>(actions[0]);
  const [reactionSelected, setReactionSelected] = useState<any>(reactions[0]);
  const [name, setName] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [cronTime, setCronTime] = useState<string>('');

  const fetchData = async () => {
    const action = await getVar('action');
    if (action) {
      setActionStatus(true);
      setActionSelected(actions[parseInt(action)]);
    } else {
      setActionStatus(false);
      removeVar('action');
      setActionSelected(actions[0]);
    }

    const reaction = await getVar('reaction');
    if (reaction) {
      setReactionStatus(true);
      setReactionSelected(reactions[parseInt(reaction)]);
    } else {
      setReactionStatus(false);
      removeVar('reaction');
      setReactionSelected(reactions[0]);
    }

    const myRepo = await getVar('githubRepo');
    if (myRepo) {
      setRepo(myRepo);
      removeVar('githubRepo');
    }

    const myCronTime = await getVar('cronTime');
    if (myCronTime) {
      setCronTime(myCronTime);
      console.log('cronTime: ' + myCronTime);
      removeVar('cronTime');
    }
  };
  fetchData();
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <View style={styles.all} >
        <View style={styles.top} >
          <Text style={styles.account} >Let's Forge !</Text>
          {actionStatus &&
            <TouchableOpacity onPress={() => {
              removeVar('action');
              removeVar('reaction');
              setActionSelected(actions[0]);
              setReactionSelected(reactions[0]);
              setName('');
            }} >
              <Image style={{ width: 40, height: 40 }} source={require('@ressources/reset.png')} />
            </TouchableOpacity>
          }
        </View>
        <View style={styles.forge} >
          <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setName} value={name} placeholder="Name your flow" hideText={false} autocomplete="off" />
          <TouchableOpacity onPress={() => navigation.navigate('Action')} style={[styles.action, { backgroundColor: actionSelected.backgroundColor }]} activeOpacity={0.5} >
            <Image style={styles.logo} source={actionSelected.icon} />
            <Text style={{ color: actionSelected.textColor, fontWeight: 'bold', fontSize: 20 }} >{actionSelected.name}</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          {!actionStatus ? (
            <View style={styles.disabled} />
          ) : (
            <TouchableOpacity onPress={() => { navigation.navigate('Reaction'); }} style={[styles.reaction, { backgroundColor: reactionSelected.backgroundColor }]} activeOpacity={0.5} >
              <Image style={styles.logo} source={reactionSelected.icon} />
              <Text style={{ color: reactionSelected.textColor, fontWeight: 'bold', fontSize: 20 }} >{reactionSelected.name}</Text>
            </TouchableOpacity>
          )}
          {reactionStatus &&
            <View style={styles.bottom} >
              <AreaButton backgroundColor="#1F1F1F" activeOpacity={0.5} textColor="white" title="Forge this Flow" onPress={async () => {
                if (name === '') {
                  showToast('Please name your flow');
                  return;
                }
                const value = await forge(name, repo, cronTime);
                if (value === 0) {
                  setActionSelected(actions[0]);
                  setReactionSelected(reactions[0]);
                  setName('');
                }
              }} />
            </View>
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

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
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: '5%',
  },
  account: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F1F1F",
  },
  forge: {
    width: '90%',
    backgroundColor: "#F5F5F5",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
  },
  action: {
    width: '100%',
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: '20%',
  },
  reaction: {
    width: '100%',
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
    width: '100%',
    height: 80,
    backgroundColor: "#CECECE",
    borderRadius: 12,
  },
  bottom: {
    width: '100%',
    height: '53%',
    justifyContent: "flex-end",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 5,
    marginLeft: -5,
  },
});
