import React, { useState, useEffect } from 'react';
import './NavigationBar.css';
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  name: string;
  notifications?: boolean;
}

const AreaNavigationBar: React.FC<NavigationProps> = ({ name, notifications }) => {
  const navigate = useNavigate();
  const selection = require('../assets/selection.png');
  const notif = require('../assets/notifications.png');
  const [isOpenBar, setIsOpenBar] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const OpenBar = () => {
    setIsOpenBar(!isOpenBar);
    setIsActive(!isActive);
  };
  return (
    <div className="container">
        <div className="nav-bar">
            {isOpenBar ? (
              <div className="global-open">
                <div className="blur" onClick={OpenBar}/>
                <div className={`open ${isMounted && isActive ? 'active' : ''}`}>
                  <img className="logo" src={logo} alt="logo" />
                  <img className="cross" src={require("../assets/cross.png")} onClick={OpenBar} alt="cross"/>
                  <div className='pages'>
                    <div className="page" onClick={() => navigate('/home')}>
                      <img src={require("../assets/home.png")} alt=""/>
                      <h1>HOME</h1>
                    </div>
                    <div className="line"/>
                    <div className="page" onClick={() => navigate('/flows')}>
                      <img src={require("../assets/play.png")} alt="" />
                      <h1>FLOWS</h1>
                    </div>
                    <div className="line"/>
                    <div className="page" onClick={() => navigate('/forger')}>
                      <img src={require("../assets/anvil.png")} alt=""/>
                      <h1>FORGE</h1>
                    </div>
                    <div className="line"/>
                  </div>
                </div>
              </div>
            ) : (
              <div className='informations'>
                <img src={selection} alt="logo" onClick={OpenBar}/>
                <img className ="nav-bar-logo" src={logo} alt="" />
                <div className="nav-bar-title">
                  <p>{name}</p>
                </div>
              </div>
            )}
            <div className="nav-bar-notifications">
              {notifications && <img src={notif} alt="notif"></img>}
            </div>
            <div className="nav-bar-profile">
              <img src='https://www.w3schools.com/howto/img_avatar.png' alt="profile" onClick={() => {navigate("/profile")}}/>
            </div>
        </div>
    </div>
  );
};

export default AreaNavigationBar;