import React, { useState } from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';

interface SwitchProps {
  backgroundColor?: string;
  offColor?: string;
  onColor?: string;
  onSwitch: () => void;
  status?: boolean;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ backgroundColor, offColor, onColor, onSwitch, status, disabled }) => {
  const [statusValue, setStatusValue] = useState(status);
  const [xPosition, setXPosition] = useState(status ? 40 : 0);

  const handlePress = () => {
    setStatusValue(!statusValue);
    if (xPosition == 0) {
      setXPosition(40);
    } else {
      setXPosition(0);
    }
    onSwitch();
  };

  return (
    <View style={styles.test}>
      {disabled && (
        <TouchableHighlight onPress={onSwitch} disabled={disabled}>
          <View style={[styles.container, { backgroundColor: '#C9C9C9' }]}>
            <View style={[{ backgroundColor: offColor }]}>
            </View>
          </View>
        </TouchableHighlight>
      )}
      {!disabled && (
        <TouchableHighlight onPress={handlePress} disabled={disabled} style={[{ borderRadius: 20 }]}>
          <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            {statusValue && (
              <View style={[styles.switchContainer, { left: xPosition }, { backgroundColor: onColor }]}>
                <View style={[{ backgroundColor: onColor }]} />
              </View>
            )}
            {!statusValue && (
              <View style={[styles.switchContainer, { left: xPosition }, { backgroundColor: offColor }]}>
                <View style={[{ backgroundColor: offColor }]} />
              </View>
            )}
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    height: 30,
    width: 65,
    borderRadius: 20,
    position: 'relative',
  },
  container: {
    height: 30,
    width: 65,
    borderRadius: 20,
    backgroundColor: '#E7E7E7',
  },
  switchContainer: {
    height: 30,
    width: 30,
    borderRadius: 20,
    position: 'absolute',
  },
});

export default Switch;
