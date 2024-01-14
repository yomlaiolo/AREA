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
    <div style={{ opacity: disabled ? 0.5 : 1, backgroundColor: backgroundColor }} className="miniflow-area" onClick={onPress}>
      <div className="miniflow-img-area">
        <img src={icon} className="miniflow-icon" alt="icon" />
      </div>
      {!hide_title && (
        <div className='miniflow-title'>
          <p style={{ color: textColor }}>{title}</p>
        </div>
      )}
    </div>
  );
};

export default AreaMiniFlow;