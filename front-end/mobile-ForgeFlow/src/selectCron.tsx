import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { getVar, setVar } from "./api";
import { showToast } from "./utils";
import AreaButton from "@components//button";
import { useRoute } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";

export default function SelectCron({ navigation, type }: any) {
  const route = useRoute();
  const params = route.params;
  const string_params = JSON.stringify(params);
  const cronType = string_params.substring(9, string_params.length - 2);
  const tmpTime = new Date().setHours(12, 0, 0, 0);
  const [time, setTime] = useState<Date>(new Date(tmpTime));
  const text = 'You need to select the time gap in ' + cronType + ' when the action will be actioned.';

  return (
    <View style={styles.all}>
      <View style={styles.top} >
        <TouchableOpacity onPress={() => { navigation.goBack() }} >
          <Image style={styles.chevron} source={require('@ressources/chevronL.png')} />
        </TouchableOpacity>
        <Text style={styles.title} >Select the time</Text>
      </View>
      <View style={styles.separator} />
      <Image style={{ width: 200, height: 200, marginTop: '10%' }} source={require('@ressources/clock.png')} />
      <Text style={{ fontSize: 20, color: '#1F1F1F', marginTop: 20, marginHorizontal: 30, textAlign: 'center', width: '100%' }} >{text}</Text>
      <View style={styles.picker}>
        <DatePicker
          date={time}
          onDateChange={setTime}
          mode={cronType === 'time' ? "time" : "datetime"}
          locale="fr"
          minuteInterval={5}
          androidVariant="nativeAndroid"
          textColor="#1F1F1F"
        />
      </View>
      <View style={styles.bottom} >
        <AreaButton backgroundColor="#1F1F1F" activeOpacity={0.5} textColor="white" title="Add this action" onPress={async () => {
          await setVar('cronTime', time.toLocaleString());
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
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: '5%',
  },
  bottom: {
    width: '90%',
    height: '26%',
    justifyContent: "flex-end",
  },
})
