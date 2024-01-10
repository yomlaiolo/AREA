import React, { useEffect, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { setVar } from "./api";
import AreaButton from "@components//button";
import { actions } from "./area";
import { useRoute } from "@react-navigation/native";
import TextBox from "@components//textbox";
import { showToast } from "./utils";

export default function SetNotification({ navigation, idx }: any) {
  const route = useRoute();
  const params = route.params;
  const string_params = JSON.stringify(params);
  const indexStr = string_params.substring(8, string_params.length - 2);
  const index = parseInt(indexStr);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.all}>
        <View style={styles.top} >
          <TouchableOpacity onPress={() => { navigation.goBack() }} >
            <Image style={styles.chevron} source={require('@ressources/chevronL.png')} />
          </TouchableOpacity>
          <Text style={styles.title} >Send a notification</Text>
        </View>
        <View style={styles.separator} />
        <ScrollView style={{ width: '90%', height: '100%', marginTop: 20 }} contentContainerStyle={{ alignItems: 'center' }} >
          <Image style={{ width: 150, height: 150, }} source={require('@ressources/notification.png')} />
          <Text style={{ fontSize: 20, color: '#1F1F1F', marginTop: 20, marginHorizontal: 30, textAlign: 'center', width: '90%' }} >{text}</Text>
          <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setTitle} value={title} placeholder="Title" hideText={false} autocomplete="off" />
          <TextBox backgroundColor="white" borderColor="#E2E2E2" onChangeText={setBody} value={body} placeholder="Body" hideText={false} autocomplete="off" />
          <AreaButton backgroundColor="#1F1F1F" activeOpacity={0.5} textColor="white" title="Add this reaction" onPress={async () => {
            if (title === '' || body === '') {
              showToast('Please fill all fields');
              return;
            }
            var value = {
              title: title,
              body: body,
            };
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
    width: '80%',
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: '5%',
  },
})
