import React from 'react';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import logo from '../assets/logo.svg'
import { useNavigate, Link } from 'react-router-dom';
import './Loginpage.css';

export const Loginpage = () => {
  const [Password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const navigate = useNavigate();

  return (
    <div>
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p className='Text-Header'>SIGN in to forgeflow</p>
        <div className='Rectangle'>
          <div className='Element-Login'>
            <p>Email</p>
            <TextBox onChangeText={setEmail} value={email} hideText={false} backgroundColor='#DFDFDF' />
            <p>Password</p>
            <TextBox onChangeText={setPassword} value={Password} hideText={true} backgroundColor='#DFDFDF' />
          </div>
          <div className='Button-Signin'>
            <Button onPress={() => { }} title="SIGN IN" backgroundColor='#E88741' />
          </div>
          <div className='Ligne'>
            <div className='Ligne1' />
          </div>
          <div className='Other-Login'>
            <p>Sign in with...</p>
            <img className='Mini-Logo' src={require("../assets/google.png")} alt="google" onClick={() => { console.log("sa fonctionne") }} />
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