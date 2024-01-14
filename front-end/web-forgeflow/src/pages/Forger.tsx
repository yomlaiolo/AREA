import './Forger.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { getToken } from '../api';
import { actions, reactions } from '../area';
import { getVar, setVar, removeVar, createArea } from "../api";
import NavigationBar from '../components/NavigationBar';
import MiniFlow from '../components/MiniFlow';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import AreaConfig from '../components/AreaConfig';

function refreshPage() {
  window.location.reload();
}

async function forge(name: string, reactionValue: any) {
  const actionId = await getVar('action');
  const reactionId = await getVar('reaction');
  const action = actions[parseInt(actionId as string)];
  const reaction = reactions[parseInt(reactionId as string)];
  var description = 'When ' + action.name + ' then ' + reaction.name;
  var value;
  var obj = JSON.parse(reactionValue);
  const act_var = await getVar('actionValue');
  const react_var = await getVar('reactionValue');

  if (action.redirection === 'github' && obj.repo !== '') {
    description = 'When ' + action.name + ' on ' + obj.repo + ' then ' + reaction.name;
    if (action.name === 'Pull request created') {
      value = {
        repo: obj.repo,
        fromBranch: "__fromBranch__",
        headBranch: "__headBranch__",
      }
    } else if (action.name === 'Issue created') {
      value = {
        repo: obj.repo,
        title: "__title__",
        body: "__body__",
      }
    }
  } else if (action.redirection === 'cron') {
    if (action.name === 'Each day at [x]' && obj.cron !== '') {
      description = 'Each day at ' + obj.cron + ' then ' + reaction.name;
      value = {
        cron: obj.cron,
      }
    } else if (action.name === 'At [hour] on [day]' && obj.cron !== '') {
      description = 'At ' + obj.cron + ' then ' + reaction.name;
      value = {
        cron: obj.cron,
      }
    }
  } else if (action.redirection === 'google') {
    value = {
      from: "__from__",
      cc: "__cc__",
      to: "__to__",
      subject: "__subject__",
      body: "__body__",
    }
  }

  var myArea = {
    name: name,
    description: description,
    action: {
      type: actions[parseInt(actionId as string)].type,
      value: act_var ? JSON.parse(act_var) : null
    },
    reaction: {
      type: reactions[parseInt(reactionId as string)].type,
      value: react_var ? JSON.parse(react_var) : null
    },
  };

  var response = await createArea(myArea);
  if (response !== 0) {
    alert("Error");
  }

  removeVar('action');
  removeVar('reaction');
  return 0;
}


export const Forger = () => {
  const [action, setAction] = useState<boolean>(false);
  const [reaction, setReaction] = useState<boolean>(false);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [selectedFlow2, setSelectedFlow2] = useState<string | null>(null);
  const [areaType, setAreaType] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [index2, setIndex2] = useState<number>(0);
  const [flowName, setFlowName] = useState<string>("");
  const [displayAreaConfig, setDisplayAreaConfig] = useState<boolean>(false);
  
  function setActionInfo (selected: string, index: number) {
    setSelectedFlow(selected);
    setIndex(index);
    setAreaType('action');
    setDisplayAreaConfig(true);
    setVar('action', index.toString());
  }
  
  function setReactionInfo (selected: string, index: number) {
    setSelectedFlow2(selected);
    setIndex2(index);
    setAreaType('reaction');
    setDisplayAreaConfig(true);
    setVar('reaction', index.toString());
  }

  function closeAreaConfig() {
    setDisplayAreaConfig(false);
  }
  
  return (
    <div className="App">
      <header className="flow-header">
        <NavigationBar name="Forger" notifications={true}/>
        {action === true ? (
          <div className="ActionDisplayer">
            <h1>Choose an Action</h1>
            <div className="flow-list">
              {actions.filter(item => item.id !== 0).map((action) => (
                <MiniFlow
                  key={action.id}
                  title={action.name}
                  icon={action.icon}
                  backgroundColor={action.backgroundColor}
                  onPress={() => setActionInfo(action.name, action.id)}
                />
              ))}
            </div>
          </div>
        ) : null}
        {reaction === true ? (
          <div className="ReactionDisplayer">
            <h1>Choose a Reaction</h1>
            <div className="flow-list">
              {reactions.filter(item => item.id !== 0).map((reaction) => (
                <MiniFlow
                  key={reaction.id}
                  title={reaction.name}
                  icon={reaction.icon}
                  backgroundColor={reaction.backgroundColor}
                  onPress={() => setReactionInfo(reaction.name, reaction.id)}
                />
              ))}
            </div>
          </div>
        ) : null}
        {selectedFlow !== null && displayAreaConfig ? (
          <div className="AreaConfig">
            <AreaConfig title={actions[index].name} icon={actions[index].icon} description={actions[index].description} type={areaType} fields={actions[index].fields} display={closeAreaConfig} />
          </div>
        ) : null}
        {selectedFlow2 !== null && displayAreaConfig ? (
          <div className="AreaConfig">
            <AreaConfig title={reactions[index2].name} icon={reactions[index2].icon} description='' type={areaType} fields={reactions[index2].fields} display={closeAreaConfig}/>
          </div>
        ) : null}
        <div className="separation"/>
        <div className="flow-text">
          <h1 style={{opacity: 0.1, marginTop: 20}}>Forge</h1>
          <h1 style={{opacity: 0.2, marginTop: 50}}>Forge</h1>
          <h1 style={{opacity: 0.3, marginTop: 80}}>Forge</h1>
          <h1 style={{marginTop: 110}}>Forge</h1>
        </div>
        <div className="Action" onClick={() => { setAction(!action); setReaction(false); }} style={{backgroundColor: actions[index].backgroundColor, color: actions[index].textColor}}>
            <img src={(actions[index].icon)} alt="forge" style={{width: 40, height: 40}}/>
          <h2 style={{marginTop: 20}}>{actions[index].name}</h2>
        </div>
        <div className="vertical-bar"/>
        <div className="Reaction" onClick={() => { setReaction(!reaction); setAction(false); }} style={{backgroundColor: reactions[index2].backgroundColor, color: reactions[index2].textColor}}>
            <img src={(reactions[index2].icon)} alt="forge" style={{width: 40, height: 40}}/>
          <h2 style={{marginTop: 20}}>{reactions[index2].name}</h2>
        </div>
        <div className="vertical-bar"/>
        <div className="textbox">
          <TextBox placeholder="Name your flow" value={flowName} onChangeText={setFlowName} customwidth={300}/>
        </div>
        <div className="create">
          <Button title="Create" onPress={async () => {forge(flowName, await getVar('reactionValue')); refreshPage();}} backgroundColor="black" textColor="#F5F5F5"/>
        </div>
      </header>
    </div>
  );
}
