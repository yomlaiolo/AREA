import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  icon?: any;
  activeOpacity?: number;
}

const AreaButton: React.FC<ButtonProps> = ({ onPress, title, disabled, backgroundColor, textColor, icon, activeOpacity }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.touchable} activeOpacity={activeOpacity}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        {icon && <Image source={icon} style={styles.icon} />}
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    marginVertical: 10,
  },
  container: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    borderRadius: 12,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    position: 'absolute',
    marginLeft: '3%',
    width: '9%',
    height: '85%',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});

export default AreaButton;
