import React, { useState } from 'react';
import './TextBox.css';

interface TextBoxProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  hideText?: boolean;
  autocomplete?: any;
  disabled?: boolean;
  customwidth?: number;
}

const AreaTextBox: React.FC<TextBoxProps> = ({ placeholder, onChangeText, value, hideText, autocomplete, disabled, customwidth }) => {
  const hide = require('../assets/hide.png');
  const show = require('../assets/show.png');
  const [ispassword, setIsPassword] = useState(hideText);
  const toggleShow = () => {
    setIsPassword(!ispassword);
  };
  if (!customwidth)
    customwidth = 320;
  return (
    <div className="box-area" style={{ opacity: disabled ? 0.5 : 1, width: customwidth }}>
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