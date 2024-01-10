import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Pressable, Platform, ImageSourcePropType } from 'react-native';
import { deleteArea } from 'src/api';
import { showToast } from 'src/utils';

async function deleteFlow(id: string) {
  const response = await deleteArea(id);
  console.log(response);
  if (response === 0) {
    console.log('Flow deleted');
    showToast('Your flow has been deleted');
  } else {
    console.log('Error deleting flow');
    showToast('Error deleting flow');
  }
}

interface FlowProps {
  onPress: () => void;
  title: string;
  icons: any;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  description: string;
  id: string;
  refreshList: () => void;
}

const Flow: React.FC<FlowProps> = ({ onPress, title, icons, disabled, backgroundColor, textColor, description, id, refreshList }) => {
  const [longpress, setLongpress] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  if (!backgroundColor) {
    backgroundColor = '#1F1F1F';
  }
  if (!textColor) {
    textColor = '#1F1F1F';
  }
  const handleLongPress = () => {
    setLongpress(!longpress);
  };

  return (
    <View style={{ width: '100%', height: 'auto', marginBottom: 50, backgroundColor: 'transparent' }} >
      <TouchableOpacity onPress={onPress} onLongPress={handleLongPress} activeOpacity={0.8} disabled={disabled} style={styles.touchable}>
        {longpress && (
          <TouchableOpacity style={[styles.delete, { backgroundColor: '#E88741' }]} activeOpacity={0.8} onPress={async () => { await deleteFlow(id); refreshList() }} >
            <Image source={require('@ressources/delete.png')} style={[{ width: 25, height: 25 }]} />
          </TouchableOpacity>
        )}
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
          {icons.map((icon: ImageSourcePropType, index: number) => (
            <Image key={index} source={icon} style={[styles.icon, { marginLeft: 20 + index * 40, marginTop: 20 }]} />
          ))}
          <Text style={[styles.description, { color: '#F5F5F5', marginTop: 70 }]}>{description}</Text>
        </View>
      </TouchableOpacity>
      <Pressable onPress={onPress} style={styles.label}>
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  clicked: {
    opacity: 0.9,
  },
  touchable: {
    width: '100%',
    height: 225,
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
  container: {
    width: '100%',
    height: 225,
    borderRadius: 25,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    position: 'absolute',
    marginLeft: '10%',
    marginTop: '15%',
    width: 30,
    height: 30,
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
  label: {
    width: '50%',
    height: 45,
    top: 202,
    left: '25%',
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
  },
  delete: {
    height: 45,
    width: 45,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    right: 0,
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  }
});

export default Flow;
