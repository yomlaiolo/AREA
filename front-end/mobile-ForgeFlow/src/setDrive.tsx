import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { getRepo, setVar } from "./api";
import AreaButton from "@components//button";
import { actions } from "./area";
import { useRoute } from "@react-navigation/native";
import TextBox from "@components//textbox";
import { showToast } from "./utils";
import { Picker } from "@react-native-picker/picker";

export default function SetDrive({ navigation, idx, name }: any) {
  const route = useRoute();
  const params = route.params;
  const index = (params as { idx?: number }).idx ?? 0;
  const type = (params as { name?: string }).name ?? '';
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const [body, setBody] = useState('');
  const [icon, setIcon] = useState(require('@ressources/drive.png'));

  useEffect(() => {
    const fetchData = async () => {
      var valuesArray = Object.values((actions[index]).value);
      if (valuesArray.length === 0) {
        valuesArray = ['no variable available'];
      }
      setText('You can use the following variables: ' + valuesArray.join('\n'));
      if (type === 'Create a doc') {
        setIcon(require('@ressources/docs.png'));
      } else if (type === 'Create a sheet') {
        setIcon(require('@ressources/sheets.png'));
      }
    };
    fetchData();
  }, [index]);

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
          <Image style={{ width: 150, height: 150, }} source={icon} />
          <Text style={{ fontSize: 20, color: '#1F1F1F', marginTop: 20, marginHorizontal: 30, textAlign: 'center', width: '90%' }} >{text}</Text>
          <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setFile} value={file} placeholder="File name" hideText={false} autocomplete="off" />
          {type.startsWith('Create') ? (
            <>
              <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setBody} value={body} placeholder="Body" hideText={false} autocomplete="off" />
            </>
          ) : (null)}
          <AreaButton backgroundColor="#1F1F1F" activeOpacity={0.5} textColor="white" title="Add this reaction" onPress={async () => {
            var value = {};
            if (file === '') {
              showToast('Please enter a file name');
              return;
            }
            if (type === 'Delete a file') {
              value = {
                fileName: file,
              };
            } else {
              value = {
                fileName: file,
                fileContent: body,
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
