import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { getRepo, getVar, setVar } from "./api";
import { showToast } from "./utils";
import AreaButton from "@components//button";
import { useRoute } from "@react-navigation/native";

export default function SelectGithugRepo({ navigation, name }: any) {
  const route = useRoute();
  const params = route.params;
  const string_params = JSON.stringify(params);
  const type = string_params.substring(9, string_params.length - 2);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [repoList, setRepoList] = useState([]);
  const text = 'You need to select the repository where ' + type + ' will be Action.';

  useEffect(() => {
    const fetchRepoList = async () => {
      const repos = await getRepo();
      setRepoList(repos as []);
    };
    fetchRepoList();
  }, []);
  return (
    <View style={styles.all}>
      <View style={styles.top} >
        <TouchableOpacity onPress={() => { navigation.goBack() }} >
          <Image style={styles.chevron} source={require('@ressources/chevronL.png')} />
        </TouchableOpacity>
        <Text style={styles.title} >Select a repository</Text>
      </View>
      <View style={styles.separator} />
      <Image style={{ width: 200, height: 200, marginTop: '10%' }} source={require('@ressources/github.png')} />
      <Text style={{ fontSize: 20, color: '#1F1F1F', marginTop: 20, marginHorizontal: 30, textAlign: 'center' }} >{text}</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedRepo}
        onValueChange={(itemValue) =>
          setSelectedRepo(itemValue)
        }>
        <Picker.Item label="Select a repository" value="" />
        {repoList && repoList.map((item, index) => {
          return (<Picker.Item label={item} value={item} key={index} />)
        }
        )}
      </Picker>
      <View style={styles.bottom} >
        <AreaButton backgroundColor="#1F1F1F" activeOpacity={0.5} textColor="white" title="Add this action" onPress={async () => {
          if (selectedRepo === '') {
            showToast('Please select a repository');
            return;
          }
          await setVar('githubRepo', selectedRepo);
          navigation.goBack();
        }} />
      </View>
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
  picker: {
    width: '80%',
    height: 50,
    marginTop: 20,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottom: {
    width: '90%',
    height: '40%',
    justifyContent: "flex-end",
  },
})
