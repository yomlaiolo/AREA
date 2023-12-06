import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface TextBoxProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  hideText: boolean;
  autocomplete: any;
}

const TextBox: React.FC<TextBoxProps> = ({ placeholder, onChangeText, value, hideText, autocomplete }) => {
  const hide = require('../res/hide.png');
  const show = require('../res/show.png');
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
            <Image source={ispassword ? show : hide} style={{width:24, height:24}} />
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
    borderColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: '#1F1F1F',
  },
});

export default TextBox;
