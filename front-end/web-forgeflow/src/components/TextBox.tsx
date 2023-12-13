import React, { useState } from 'react';
import './TextBox.css';

interface TextBoxProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  hideText?: boolean;
  autocomplete?: any;
  disabled?: boolean;
}

const AreaTextBox: React.FC<TextBoxProps> = ({ placeholder, onChangeText, value, hideText, autocomplete, disabled }) => {
  const hide = require('../res/hide.png');
  const show = require('../res/show.png');
  const [ispassword, setIsPassword] = useState(hideText);
  const toggleShow = () => {
    setIsPassword(!ispassword);
  };
  return (
    <div className="box-area" style={{ opacity: disabled ? 0.5 : 1 }}>
      <input
        type={ispassword ? 'password' : 'text'}
        placeholder={placeholder}
        value={value} onChange={(e) => onChangeText(e.target.value)}
        autoComplete={autocomplete}
      />
      {hideText &&
        <img src={ispassword ? show : hide} alt="show" onClick={toggleShow} />
      }
    </div>
  );
};

export default AreaTextBox;