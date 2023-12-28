import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Pressable } from 'react-native';

interface MiniFlowProps {
  onPress: () => void;
  title: string;
  icon: any;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  big_display?: boolean;
}

const MiniFlow: React.FC<MiniFlowProps> = ({ onPress, title, icon, disabled, backgroundColor, textColor, big_display }) => {
  const [isClicked, setIsClicked] = useState(false);
  if (!backgroundColor) {
    backgroundColor = '#1F1F1F';
  }
  if (!textColor) {
    textColor = '#1F1F1F';
  }

  return (
    <View>
      {big_display &&
        <View>
          <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled} style={styles.big_touchable}>
            <View style={[styles.container_big, { backgroundColor: backgroundColor }]}>
              <Image source={icon} style={[styles.icon, { marginLeft: 190, marginTop: 30 }]} />
            </View>
          </TouchableOpacity>
          <Pressable style={styles.label_big}>
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
          </Pressable>
        </View>
      }
      {!big_display &&
        <View>
          <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled} style={styles.mini_touchable}>
            <View style={[styles.container_mini, { backgroundColor: backgroundColor }]}>
              <Image source={icon} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Pressable style={styles.label_mini}>
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  clicked: {
    opacity: 0.9,
  },
  big_touchable: {
    width: 400,
    height: 225,
    backgroundColor: '#1F1F1F',
    borderRadius: 50,
  },
  mini_touchable: {
    width: 225,
    height: 225,
    backgroundColor: '#1F1F1F',
    borderRadius: 50,
  },
  container_big: {
    height: 225,
    width: 400,
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  container_mini: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    position: 'absolute',
    marginLeft: '10%',
    marginTop: '15%',
    width: 140,
    height: 140,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F1F1F'
  },
  label_mini: {
    width: 110,
    height: 45,
    top: 202,
    left: 55,
    position: 'absolute',
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  label_big: {
    width: 225,
    height: 45,
    top: 202,
    left: 90,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }
});

export default MiniFlow;
