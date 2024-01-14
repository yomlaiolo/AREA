import './FlowsPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import TextBox from '../components/TextBox';
import Flow from '../components/Flow';
import { getAreas } from '../api';
import { actions, reactions } from "../components/Area";

async function getData() {
  const areas = await getAreas();
  return areas;
}

export const FlowsPage = () => {
  const [areas, setAreas] = useState<any[]>([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [selectedFlow, setSelectedFlow] = useState({name: undefined, description: undefined, action: {type: undefined, value: undefined}, reaction: {type: undefined, value: undefined}});
  const first_render = true; 
  console.log("selectedFlow", selectedFlow);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      const areas2 = await getData();
      setAreas(areas2);
      console.log("areas: ", areas2)
    };
    if (first_render) {
      fetchData();
    }
  }, []);

  const handlePress = (area: any) => {
    setSelectedFlow(area);
  };

  return (
    <div className="App">
      <header className="flow-header">
        <NavigationBar name="Flows" notifications={true} />
        <div className="flow-text">
          <h1 style={{ opacity: 0.1, marginTop: 20 }}>Flows</h1>
          <h1 style={{ opacity: 0.2, marginTop: 50 }}>Flows</h1>
          <h1 style={{ opacity: 0.3, marginTop: 80 }}>Flows</h1>
          <h1 style={{ marginTop: 110 }}>Flows</h1>
        </div>
        <div className="flow-search">
          <TextBox placeholder="Search flows" value={search} onChangeText={setSearch} customwidth={550} />
        </div>
        <div className="separation" />
        <div className="flow-display-list">
          {areas.map((area, index) => {
            const icons: any[] = [];
            actions.forEach(element => {
              if (element.type === area.action.type && element.type !== "recurrent") {
                icons.push(element.icon);
              } else if (element.type === area.action.type && element.type === "recurrent") {
                if (area.description.includes(element.name.split(' ')[0]))
                  icons.push(element.icon);
              }
            });
            reactions.forEach(element => {
              if (element.type === area.reaction.type) {
                icons.push(element.icon);
              }
            });
            return <Flow key={index} title={area.name} description={area.description} onPress={() => handlePress(area)} icons={icons} />
          })}
        </div>
        {selectedFlow.name === undefined ? (
          <div className="add-flow">
            <h1>Select a flow to see it.</h1>
            <img src={require("../assets/selectFlow.png")} alt="add" style={{ width: 200, height: 200 }} />
            <h1>OR</h1>
            <img className="addLogo" src={require("../assets/addFlow.png")} alt="add" style={{ width: 200, height: 200 }} onClick={() => navigate('/forger')} />
            <h1>Create a new flow.</h1>
          </div>) : (
          <div className="add-flow">
            <h1>Viewing "{selectedFlow.name}" FLOW.</h1>
            <p>{selectedFlow.description}</p>
          </div>
        )}
      </header>
    </div>
  );
}
