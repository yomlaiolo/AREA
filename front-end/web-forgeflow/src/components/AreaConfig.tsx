import React, { useState, useEffect } from 'react';
import './AreaConfig.css';
import { getVar, setVar } from '../api';
import Button from './Button';
import TextBox from './TextBox';
import { format } from 'date-fns';

interface FlowProps {
  title: string;
  description: string;
  icon: any;
  type: string;
  fields?: string[];
  display: () => void;
}

function transformCronString(date: Date, type: string) {
  const minute = format(date, 'm');
  const hour = format(date, 'H');
  const day = format(date, 'd');
  const month = format(date, 'M');
  const year = format(date, 'y');

  if (type === 'time') {
    var cronString = `${minute} ${hour} * * *`;
  } else if (type === 'day') {
    var cronString = `0 ${minute} ${hour} ${day} ${month} * ${year}`;
  } else {
    var value = {
      hour: hour,
      minute: minute,
    }
    return value;
  }
  return cronString;
}


async function setValue(name: string, map: any) {
  var action_value = {};
  var reaction_value = {};

  switch (name) {
    case 'Email received':
      action_value = {
        from: "__from__",
        cc: "__cc__",
        to: "__to__",
        subject: "__subject__",
        body: "__body__",

      };
      break;
    case 'Pull request created':
      action_value = {
        fromBranch: "__fromBranch__",
        headBranch: "__headBranch__",
      };
      break;
    case 'Issue created':
      action_value = {
        title: "__title__",
        body: "__body__",
      };
      break;
    case 'Each day at [x]':
      action_value = {
        cron: transformCronString(map['cronTime'], 'time'),
      };
      break;
    case 'At [hour] on [day]':
      action_value = {
        cron: transformCronString(map['cronTime'], 'day'),
      };
      break;
    case 'Every [x] time':
      action_value = transformCronString(map['cronTime'], 'each');
      break;
    case 'Send an email':
      reaction_value = {
        from: "__from__",
        cc: "__cc__",
        to: "__to__",
        subject: "__subject__",
        body: "__body__",
      };
      break;
    case 'Create a Pull Request':
      reaction_value = {
        repo: map['repo'],
        title: map['title'],
        body: map['body'],
        fromBranch: "__fromBranch__",
        headBranch: "__headBranch__",
      };
      break;
    case 'Create an issue':
      reaction_value = {
        repo: map['repo'],
        title: map['title'],
        body: map['body'],
      };
      break;
    case 'Send a notification':
      reaction_value = {
        title: "__title__",
        body: "__body__",
      };
      break;
    case 'Resume a text':
      reaction_value = {
        text: "__text__",
      };
      break;
    case 'Suggest a response':
      reaction_value = {
        text: "__text__",
      };
      break;
    default:
      break;
  };
  if (Object.keys(action_value).length !== 0)
    setVar('actionValue', JSON.stringify(action_value));
  if (Object.keys(reaction_value).length !== 0)
    setVar('reactionValue', JSON.stringify(reaction_value));
}

const AreaAreaConfig: React.FC<FlowProps> = ({ title, icon, description, type, fields, display }) => {
  const [infos, setInfos] = useState<{ [key: string]: string | null | Date | null }>({});
  const [timeHour, setTimeHour] = useState('');
  const [timeMinute, setTimeMinute] = useState('');

  useEffect(() => {
    if (infos.cronTime) {
      setValue(title, infos);
    }
  }, [infos.cronTime]);

  const handleButtonPress = () => {
    const date = new Date();
    if (timeHour !== '' && timeMinute !== '') {
      date.setHours(Number(timeHour));
      date.setMinutes(Number(timeMinute));
      setInfos(prevInfos => ({ ...prevInfos, cronTime: date }));
    } else {
      setValue(title, infos);
    }
    display();
  };

  return (
    <div className="area-config">
      <h1>{title}</h1>
      <div className="area-logo">
        <img src={icon} alt={title} />
      </div>
      <img src={require('../assets/close.png')} alt='x' onClick={() => display()} />
      <p>{description}</p>
      {fields?.find((field) => field === 'Time') !== undefined ?
        (
          <div style={{ width: '25%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>Set the hours and minutes.</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox placeholder='Hour'
                onChangeText={setTimeHour}
                value={timeHour}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={75}
              />
              <TextBox placeholder='Minute'
                onChangeText={setTimeMinute}
                value={timeMinute}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={75}
              />
            </div>
          </div>
        ) : null
      }
      {fields?.find((field) => field === 'Repository') !== undefined ?
        (
          <div style={{ width: '25%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>Set the repo.</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox
                placeholder='Repo'
                onChangeText={(text) => setInfos({ ...infos, repo: text })}
                value={infos.repo ? infos.repo.toString() : ''}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={100} />
            </div>
          </div>
        ) : null
      }
      {fields?.find((field) => field === 'Branch') !== undefined ?
        (
          <div style={{ width: '50%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>Type a branch name.</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox
                placeholder='From branch'
                onChangeText={(text) => setInfos({ ...infos, branch: text })}
                value={infos.branch ? infos.branch.toString() : ''}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={200}
              />
            </div>
          </div>
        ) : null
      }
      {fields?.find((field) => field === 'headBranch') !== undefined ?
        (
          <div style={{ width: '25%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>Type a branch name.</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox
                placeholder='To branch'
                onChangeText={(text) => setInfos({ ...infos, headBranch: text })}
                value={infos.headBranch ? infos.headBranch.toString() : ''}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={200}
              />
            </div>
          </div>
        ) : null
      }
      {fields?.find((field) => field === 'Title') !== undefined ?
        (
          <div style={{ width: '25%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>Set a Title.</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox
                placeholder='Title'
                onChangeText={(text) => setInfos({ ...infos, title: text })}
                value={infos.title ? infos.title.toString() : ''}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={200}
              />
            </div>
          </div>
        ) : null
      }
      {fields?.find((field) => field === 'To') !== undefined ?
        (
          <div style={{ width: '25%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>Who are you going to send your mail ?</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox
                placeholder='To'
                onChangeText={(text) => setInfos({ ...infos, to: text })}
                value={infos.to ? infos.to.toString() : ''}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={200}
              />
            </div>
          </div>
        ) : null
      }
      {fields?.find((field) => field === 'CC') !== undefined ?
        (
          <div style={{ width: '25%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>Who is in CC ?</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox
                placeholder='CC'
                onChangeText={(text) => setInfos({ ...infos, cc: text })}
                value={infos.cc ? infos.cc.toString() : ''}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={200}
              />
            </div>
          </div>
        ) : null
      }
      {fields?.find((field) => field === 'Subject') !== undefined ?
        (
          <div style={{ width: '25%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>What is the subject ?</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox
                placeholder='Subject'
                onChangeText={(text) => setInfos({ ...infos, subject: text })}
                value={infos.subject ? infos.subject.toString() : ''}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={200}
              />
            </div>
          </div>
        ) : null
      }
      {fields?.find((field) => field === 'Body') !== undefined ?
        (
          <div style={{ width: '25%', justifyItems: 'center', alignContent: 'center' }}>
            <p style={{ display: 'flex', justifyContent: 'center' }}>Set a body.</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', justifyItems: 'center' }}>
              <TextBox
                placeholder='Body'
                onChangeText={(text) => setInfos({ ...infos, body: text })}
                value={infos.body ? infos.body.toString() : ''}
                backgroundColor='#1F1F1F'
                textColor='#F5F5F5'
                customwidth={200}
              />
            </div>
          </div>
        ) : null
      }
      <div style={{ position: 'absolute', left: '36%', bottom: '10%' }}>
        <Button onPress={handleButtonPress} title={`Create ${type}`} backgroundColor='#1F1F1F' textColor='#F5F5F5' />
      </div>
    </div>
  );
};

export default AreaAreaConfig;