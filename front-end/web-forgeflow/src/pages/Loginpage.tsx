import React from 'react';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import logo from '../assets/logo.svg'
import { useNavigate, Link } from 'react-router-dom';
import './Loginpage.css';
import { login, sendGoogleLogin } from '../api';
import { useGoogleLogin } from '@react-oauth/google';

export const Loginpage = () => {
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const navigate = useNavigate();

  const connect = () => {
    console.log("email: " + email + " password: " + password);
    login(email, password, navigate)
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
        <p className='Text-Header'>SIGN in to forgeflow</p>
        <div className='Rectangle'>
          <div className='Element-Login'>
            <p>Email</p>
            <TextBox onChangeText={setEmail} value={email} hideText={false} backgroundColor='#DFDFDF' customwidth={400} />
            <p>Password</p>
            <TextBox onChangeText={setPassword} value={password} hideText={true} backgroundColor='#DFDFDF' customwidth={400} />
          </div>
          <Button onPress={() => connect()} title="SIGN IN" backgroundColor='#E88741' />
          <div className='Ligne'>
            <div className='Ligne1' />
          </div>
          <div className='Other-Login'>
            <p>Sign in with...</p>
            <Button onPress={() => login_google()} title="GOOGLE" backgroundColor='#ffffff' icon={require("../assets/google.png")} border={true} />
            <p>No account yet ? <Link to="/register">Register here</Link></p>
          </div>
        </div>
        <div className='Button-Register'>
          <Button onPress={() => navigate('/register')} title="SIGN UP" backgroundColor='rgba(0, 0, 0, 0)' border={true} />
        </div>
      </header>
    </div>
  );
}