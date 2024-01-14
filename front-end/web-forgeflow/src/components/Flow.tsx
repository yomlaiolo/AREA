import React from 'react';
import './Flow.css';

interface FlowProps {
  onPress: () => void;
  title: string;
  icons: any;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  description: string;
}

const AreaFlow: React.FC<FlowProps> = ({ onPress, title, icons, disabled, backgroundColor, textColor, description }) => {
  return (
    <div className="flow-area" style={{ opacity: disabled ? 0.5 : 1, backgroundColor: backgroundColor }} onClick={onPress}>
      <div className="flow-img-area">
        {!Array.isArray(icons) ? (<img src={icons} style={{ marginLeft: 12, marginTop: 15 }} className="flow-icon" alt="icon" />) :
          icons.map((icon: any, index: number) => {
            return (
              <img key={index} src={icon} style={{ marginLeft: 12, marginTop: 15 }} className="flow-icon" alt="icon" />
            )
          }
          )}
      </div>
      <p style={{ color: textColor }}>{description}</p>
      <div className='flow-title'>
        <p style={{ color: textColor }}>{title}</p>
      </div>
    </div>
  );
};

export default AreaFlow;