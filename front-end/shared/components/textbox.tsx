import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';

interface TextBoxProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  hideText: boolean;
  autocomplete: any;
}

const TextBox: React.FC<TextBoxProps> = ({ placeholder, onChangeText, value, hideText, autocomplete }) => {
  const hide = require('../res/hide.svg');
  const show = require('../res/show.svg');
  const [ispassword, setIsPassword] = useState(hideText);
  const toggleShow = () => {
    setIsPassword(!ispassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#989898'}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={ispassword}
        autoComplete={autocomplete}
      />
      {hideText && (
        <TouchableOpacity onPress={toggleShow}>
          <View style={{ padding: 10 }}>
            <SvgUri width="24" height="24" source={ispassword ? show : hide}/>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F1F1F',
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
  },
  icon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    color: '#1F1F1F',
  },
});

export default TextBox;
