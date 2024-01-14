import React, { useEffect, useState } from "react";
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AreaButton from "@components//button";
import Flow from "@components//flow";
import { getAreas } from "./api";
import { actions, reactions } from "./area";
import { useFocusEffect } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import { showToast } from "./utils";

async function getData() {
  const areas = await getAreas();
  return areas;
}

export default function AreaPage({ navigation }: any) {
  const [areas, setAreas] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reactionValue, setReactionValue] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setAreas(await getData());
    };
    fetchData();
  }, []);

  const refresh = async () => {
    const data = await getData();
    if (data !== areas) {
      setAreas([]);
      setAreas(data);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setAreas(await getData());
      };
      fetchData();
    }, [])
  );

  return (
    <View style={styles.all} >
      <FlatList style={styles.flat} contentContainerStyle={styles.list} data={areas} renderItem={(areas) => {
        const icons: any[] = [];
        actions.forEach(element => {
          if (element.type === areas.item.action.type && element.type !== "recurrent") {
            icons.push(element.icon);
          } else if (element.type === areas.item.action.type && element.type === "recurrent") {
            if (areas.item.description.includes(element.name.split(' ')[0]))
              icons.push(element.icon);
          }
        });
        reactions.forEach(element => {
          if (element.type === areas.item.reaction.type) {
            icons.push(element.icon);
          }
        });

        return (
          <Flow
            onPress={() => { setReactionValue(areas.item.results); setModalVisible(true) }}
            title={areas.item.name}
            description={areas.item.description}
            icons={icons}
            id={areas.item._id}
            refreshList={refresh}
          />
        )
      }} />
      <View style={styles.button} >
        <View style={{ width: '48%' }} >
          <AreaButton title="Create a new flow" onPress={() => { navigation.jumpTo('Forge') }} backgroundColor='#E88741' textColor='#1F1F1F' activeOpacity={0.5} />
        </View>
        <View style={{ width: '48%' }} >
          <AreaButton title="Refresh" onPress={refresh} backgroundColor='#1F1F1F' textColor='white' activeOpacity={0.5} />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }} activeOpacity={1} onPressOut={() => setModalVisible(false)} >
          <TouchableWithoutFeedback>
            <View style={styles.modal} >
              <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 20, color: 'black' }} >Result of the reaction</Text>
              <Text style={{ fontSize: 16, fontWeight: "normal", color: 'black' }} >(if there is one)</Text>
              <ScrollView style={{
                width: '90%',
                height: 'auto',
                marginTop: 10,
                marginBottom: 10,
                paddingHorizontal: '1%',
              }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={{ fontSize: 18, fontWeight: "normal", color: 'black', textAlign: 'justify' }} >{reactionValue}</Text>
              </ScrollView>
              <View style={styles.modalBottom}>
                <AreaButton title="Copy to clipboard" onPress={() => { Clipboard.setString(reactionValue); showToast("Copied to clipboard") }} backgroundColor='#E88741' textColor='#1F1F1F' activeOpacity={0.5} />
                <AreaButton title="Close" onPress={() => setModalVisible(false)} backgroundColor='#1F1F1F' textColor='white' activeOpacity={0.5} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

    </View >
  )
};

const styles = StyleSheet.create({
  all: {
    width: '100%',
    height: '100%',
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  flat: {
    width: '100%',
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  button: {
    width: '100%',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal: {
    width: '80%',
    height: '75%',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    alignItems: "center",
    elevation: 100,
  },
  modalBottom: {
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
  },
});
