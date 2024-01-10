import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { getRepo, setVar } from "./api";
import AreaButton from "@components//button";
import { actions } from "./area";
import { useRoute } from "@react-navigation/native";
import TextBox from "@components//textbox";
import { showToast } from "./utils";
import { Picker } from "@react-native-picker/picker";

export default function SetGithub({ navigation, idx, name }: any) {
  const route = useRoute();
  const params = route.params;
  const index = (params as { idx?: number }).idx ?? 0;
  const type = (params as { name?: string }).name ?? '';
  const [text, setText] = useState('');
  const [repo, setRepo] = useState('');
  const [fromBranch, setFromBranch] = useState('');
  const [toBranch, setToBranch] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [repoList, setRepoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var valuesArray = Object.values((actions[index]).value);
      if (valuesArray.length === 0) {
        valuesArray = ['no variable available'];
      }
      setText('You can use the following variables: ' + valuesArray.join('\n'));
    };
    fetchData();
  }, [index]);
  useEffect(() => {
    const fetchRepoList = async () => {
      const repos = await getRepo();
      setRepoList(repos as []);
    };
    fetchRepoList();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.all}>
        <View style={styles.top} >
          <TouchableOpacity onPress={() => { navigation.goBack() }} >
            <Image style={styles.chevron} source={require('@ressources/chevronL.png')} />
          </TouchableOpacity>
          <Text style={styles.title} >{type}</Text>
        </View>
        <View style={styles.separator} />
        <ScrollView style={{ width: '90%', height: '100%', marginTop: 20 }} contentContainerStyle={{ alignItems: 'center' }} >
          <Image style={{ width: 150, height: 150, }} source={require('@ressources/github.png')} />
          <Text style={{ fontSize: 20, color: '#1F1F1F', marginTop: 20, marginHorizontal: 30, textAlign: 'center', width: '90%' }} >{text}</Text>
          <Picker
            style={styles.picker}
            selectedValue={repo}
            onValueChange={(itemValue) =>
              setRepo(itemValue)
            }>
            <Picker.Item label="Select a repository" value="" />
            {repoList && repoList.map((item, index) => {
              return (<Picker.Item label={item} value={item} key={index} />)
            }
            )}
          </Picker>
          {type === 'Create a pull request' ? (
            <>
              <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setFromBranch} value={fromBranch} placeholder="From branch" hideText={false} autocomplete="off" />
              <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setToBranch} value={toBranch} placeholder="To branch" hideText={false} autocomplete="off" />
            </>
          ) : (
            <>
              <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setTitle} value={title} placeholder="Title" hideText={false} autocomplete="off" />
              <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setBody} value={body} placeholder="Body" hideText={false} autocomplete="off" />
            </>
          )}
          <AreaButton backgroundColor="#1F1F1F" activeOpacity={0.5} textColor="white" title="Add this reaction" onPress={async () => {
            var value = {};
            if (type === 'Create a pull request') {
              if (fromBranch === '' || toBranch === '' || repo === '') {
                showToast('Please fill all fields');
                return;
              }
              value = {
                repo: repo,
                fromBranch: fromBranch,
                toBranch: toBranch,
              };
            } else {
              if (title === '' || body === '' || repo === '') {
                showToast('Please fill all fields');
                return;
              }
              value = {
                repo: repo,
                title: title,
                body: body,
              };
            }
            await setVar('reactionValue', JSON.stringify(value));
            navigation.goBack();
          }} />
        </ScrollView>
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
  picker: {
    width: '100%',
    backgroundColor: "#CECECE",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    paddingHorizontal: '5%',
    color: 'black',
  },
})
