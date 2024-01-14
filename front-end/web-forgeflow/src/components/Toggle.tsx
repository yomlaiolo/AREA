import React from "react";
import "./Toggle.css";

type ToggleProps = {
    Toggle: boolean;
    handleToggleChange: () => void;
  };

const Toggle: React.FC<ToggleProps> = ({ Toggle, handleToggleChange }) => {
  return (
    <div className='toggle-container' onClick={handleToggleChange}>
      <div className={`toggle-btn ${!Toggle ? "disable" : ""}`}>
        {Toggle ? "ON" : "OFF"}
      </div>
    </div>
  );
};

export default Toggle;