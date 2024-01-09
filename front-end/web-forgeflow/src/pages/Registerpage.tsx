import React from 'react';
import logo from '../assets/logo.svg'
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import { Link, useNavigate } from 'react-router-dom';
import './Registerpage.css';
import { register, sendGoogleLogin } from '../api';
import { useGoogleLogin } from '@react-oauth/google';

export const Registerpage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const navigate = useNavigate();

  const connect = () => {
    console.log("email: " + email + " password: " + password + " username: " + username);
    register(username, email, password, navigate);
  }

  const myresponseGoogle = (response: any) => {
    if (response.access_token) {
      console.log("access_token: " + response.access_token);
      sendGoogleLogin(navigate, response.access_token);
    }
  }

  const login_google = useGoogleLogin({
    onSuccess: myresponseGoogle,
    flow: 'implicit',
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive",
  });

  return (
    <div>
      <header className="App-header">
        <img src={logo} alt="logo" className='Logo' />
        <p className='Title'>ForgeFlow</p>
        <p className='Text-Header'>Let’s create your account</p>
        <div className='Rectangle_RP'>
          <div className='Element-Login_RP'>
            <p>Username</p>
            <TextBox onChangeText={setUsername} value={username} hideText={false} backgroundColor='#DFDFDF' customwidth={400} />
            <p>Email</p>
            <TextBox onChangeText={setEmail} value={email} hideText={false} backgroundColor='#DFDFDF' customwidth={400} />
            <p>Password</p>
            <TextBox onChangeText={setPassword} value={password} hideText={true} backgroundColor='#DFDFDF' customwidth={400} />
            <p className='mini_info'>Make sure it's at least 8 characters including a number and a uppercase letter.</p>
          </div>
          <Button onPress={() => connect()} title="JOIN US" backgroundColor='#E88741' />
          <div className='Other-Login_RP'>
            <p>Join in with...</p>
            <Button onPress={() => login_google()} title="GOOGLE" backgroundColor='#ffffff' icon={require("../assets/google.png")} border={true} />
            <p>Already registered ? <Link to="/login">Login here.</Link></p>
          </div>
        </div>
        <div className='Button-Signin_RP'>
          <Button onPress={() => navigate('/login')} title="SIGN IN" backgroundColor='rgba(0, 0, 0, 0)' />
        </div>
      </header>
    </div>
  );
}