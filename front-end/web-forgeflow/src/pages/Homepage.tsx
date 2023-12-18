import '../App.css';
import logo from '../assets/logo.svg'
import appstore from '../assets/AppStore.svg'
import playstore from '../assets/PlayStore.svg'
import mockup_iphone from '../assets/iMockup-iPhone.svg'
import mockup_google from '../assets/iMockup-Google.svg'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" style={{position:  "absolute", left: 0, top: 0}}/>
        <p style={{position:  "absolute", left: 150, top: 20, fontSize: '60px', lineHeight: '22px', fontFamily: '"Metamorphous", sans-serif', color: '#000000', fontWeight: 400}}>ForgeFlow</p>
        <p style={{position:  "absolute", left: 50, top: 350, fontSize: '50px', fontFamily: '"Rowdies", regular', fontWeight: 600, color: '#000000', letterSpacing: '0.25px'}}>INSTALL<br/>FORGEFLOW<br/>ON PHONE.</p>
        <img src={appstore} alt="appstore" style={{position:  "absolute", left: 100, top: 800}}/>
        <img src={playstore} alt="playstore" style={{position:  "absolute", left: 350, top: 800}}/>
        <img src={mockup_iphone} alt="mockup_iphone" style={{position:  "absolute", left: 430, top: 200, width: 270, height: 553}}/>
        <img src={mockup_google} alt="mockup_google" style={{position:  "absolute", left: 550, top: 390, width: 350, height: 570}}/>
      </header>
        <div style={{position:  "absolute", left: 1100, top: -50}}>
          <Button onPress={() => navigate('/login')} title="SIGN IN" backgroundColor='rgba(0, 0, 0, 0)' />
        </div>
        <div style={{position:  "absolute", left: 1400, top: -50}}>
          <Button onPress={() => navigate('/register')} title="SIGN UP" backgroundColor='rgba(0, 0, 0, 0)' border={true} />
        </div>
    </div>
  );
}
