import '../App.css';
import logo from '../assets/logo.svg'
import appstore from '../assets/AppStore.svg'
import playstore from '../assets/PlayStore.svg'
import mockup_iphone from '../assets/iMockup-iPhone.svg'
import mockup_google from '../assets/iMockup-Google.svg'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="App-header">
        <img src={logo} alt="logo" className='Logo' />
        <p className='Title'>ForgeFlow</p>
        <p className='Text'>INSTALL<br />FORGEFLOW<br />ON PHONE.</p>
        <img src={appstore} alt="appstore" className='appstore' />
        <img src={playstore} alt="playstore" className='playstore' />
        <img src={mockup_iphone} alt="mockup_iphone" className='mockup-iphone' />
        <img src={mockup_google} alt="mockup_google" className='mockup-google' />
      </header>
      <div className='button-login'>
        <Button onPress={() => navigate('/login')} title="SIGN IN" backgroundColor='rgba(0, 0, 0, 0)' />
      </div>
      <div className='button-register'>
        <Button onPress={() => navigate('/register')} title="SIGN UP" backgroundColor='rgba(0, 0, 0, 0)' border={true} />
      </div>
    </div>
  );
}
