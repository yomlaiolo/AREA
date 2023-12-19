import React from 'react';
import logo from '../assets/logo.svg'
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import { Link, useNavigate } from 'react-router-dom';
import './Registerpage.css';
import { register } from '../api';

export const Registerpage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const navigate = useNavigate();

  const connect = () => {
    console.log("email: " + email + " password: " + password + " username: " + username);
    register(username, email, password, navigate);
  }

  return (
    <div>
      <header className="App-header">
        <img src={logo} alt="logo" className='Logo' />
        <p className='Title'>ForgeFlow</p>
        <p className='Text-Header'>Let’s create your account</p>
        <div className='Rectangle'>
          <div className='Element-Login'>
            <p>Username</p>
            <TextBox onChangeText={setUsername} value={username} hideText={false} backgroundColor='#DFDFDF' customwidth={400} />
            <p>Email</p>
            <TextBox onChangeText={setEmail} value={email} hideText={false} backgroundColor='#DFDFDF' customwidth={400} />
            <p>Password</p>
            <TextBox onChangeText={setPassword} value={password} hideText={true} backgroundColor='#DFDFDF' customwidth={400} />
          </div>
          <div className='Button-Register_RP'>
            <Button onPress={() => connect()} title="JOIN US" backgroundColor='#E88741' />
          </div>
          <div className='Other-Login_RP'>
            <p>Join in with...</p>
            <img className='Mini-Logo' src={require("../assets/google.png")} alt="google" onClick={() => { console.log("sa fonctionne") }} />
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