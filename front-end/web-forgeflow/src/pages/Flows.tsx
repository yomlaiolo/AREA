import './Flows.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import TextBox from '../components/TextBox';
import Flow from '../components/Flow';
import { getToken } from '../api';

export const Flows = () => {
  const [token, setToken] = useState<string | null>(null);
  getToken().then(tokenValue => {
    setToken(tokenValue);
  });
  console.log("mytoken " + token)
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>("");
  const [selectedFlow, setSelectedFlow] = React.useState<string>("");
  console.log("selected" + selectedFlow)
  return (
    <div className="App">
      <header className="flow-header">
        <NavigationBar name="Flows" notifications={true}/>
        <div className="flow-text">
          <h1 style={{opacity: 0.1, marginTop: 20}}>Flows</h1>
          <h1 style={{opacity: 0.2, marginTop: 50}}>Flows</h1>
          <h1 style={{opacity: 0.3, marginTop: 80}}>Flows</h1>
          <h1 style={{marginTop: 110}}>Flows</h1>
        </div>
        <div className="flow-search">
          <TextBox placeholder="Search flows" value={search} onChangeText={setSearch} customwidth={550}/>
        </div>
        <div className="separation"/>
        <div className="flow-list">
          <Flow title="Flow 1" description="This is the first flow" onPress={() => setSelectedFlow('Flow 1')} icons={[require("../assets/google.png"), require("../assets/google.png")]}/>
          <Flow title="Flow 2" description="This is the 2nd flow" onPress={() => setSelectedFlow('Flow 2')} icons={require("../assets/google.png")}/>
          <Flow title="Flow 3" description="This is the 2nd flow" onPress={() => setSelectedFlow('Flow 3')} icons={require("../assets/google.png")}/>
          <Flow title="Flow 4" description="This is the 2nd flow" onPress={() => setSelectedFlow('Flow 4')} icons={require("../assets/google.png")}/>
          <Flow title="Flow 5" description="This is the 2nd flow" onPress={() => setSelectedFlow('Flow 5')} icons={require("../assets/google.png")}/>
          <Flow title="Flow 6" description="This is the 2nd flow" onPress={() => setSelectedFlow('Flow 6')} icons={require("../assets/google.png")}/>
          <Flow title="Flow 7" description="This is the 2nd flow" onPress={() => setSelectedFlow('Flow 7')} icons={require("../assets/google.png")}/>
          <Flow title="Flow 8" description="This is the 2nd flow" onPress={() => setSelectedFlow('Flow 8')} icons={require("../assets/google.png")}/>
        </div>
        {selectedFlow === "" ? (
        <div className="add-flow">
          <h1>Select a flow to see it.</h1>
          <img src={require("../assets/selectFlow.png")} alt="add" style={{width: 200, height: 200}}/>
          <h1>OR</h1>
          <img className="addLogo" src={require("../assets/addFlow.png")} alt="add" style={{width: 200, height: 200}} onClick={() => navigate('/forger')}/>
          <h1>Create a new flow.</h1>
        </div>) : (
          <div className="add-flow">
            <h1>Viewing "{selectedFlow}" FLOW.</h1>
          </div>
        )}
      </header>
    </div>
  );
}
