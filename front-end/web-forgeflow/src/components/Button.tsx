import React from 'react';
import './Button.css';

interface ButtonProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
    icon?: any;
}

const AreaButton: React.FC<ButtonProps> = ({ onPress, title, disabled, backgroundColor, textColor, icon }) => {
  return (
    <div className="button-area" style={{opacity: disabled ? 0.5 : 1 }}>
      <button onClick={onPress} disabled={disabled} style={{backgroundColor: backgroundColor}}>
        {icon ?
        (
          <div className="image-area">
            <img src={icon} alt="icon" />
            <p style={{color: textColor}}>{title}</p>
          </div>
        ) : (
          <p style={{color: textColor}}>{title}</p>
        )}
      </button>
    </div>
  );
};
  
export default AreaButton;