import React from 'react';
import './MiniFlow.css';

interface MiniFlowProps {
  onPress: () => void;
  title: string;
  icon: any;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  hide_title?: boolean;
}

const AreaMiniFlow: React.FC<MiniFlowProps> = ({ onPress, title, icon, disabled, backgroundColor, textColor, hide_title }) => {
  return (
    <div className="flow-area" style={{ opacity: disabled ? 0.5 : 1, backgroundColor: backgroundColor }} onClick={onPress}>
      <div className="flow-img-area">
        <img src={icon} className="flow-icon" alt="icon" />
      </div>
      {!hide_title && (
        <div className='flow-title'>
          <p style={{ color: textColor }}>{title}</p>
        </div>
      )}
    </div>
  );
};

export default AreaMiniFlow;