import React from 'react';
import './App.css';
import Button from './components/Button';
import TextBox from './components/TextBox';
import Flow from './components/Flow';
import MiniFlow from './components/MiniFlow';

function App() {
  const [test, setTest] = React.useState<string>("");
  return (
    <div className="App">
      <header className="App-header">
        {/*<Button onPress={() => { }} title="LOGIN" backgroundColor='#E88741' icon={require("./res/google.png")} />
        <MiniFlow icon={require("./res/google.png")} title="SPF1" onPress={() => { }} />
        <Flow icons={[require("./res/google.png"), require("./res/google.png"), require("./res/google.png")]} title="SPF1" onPress={() => { }} description='Macarena de fou de Antonin.' />
      <TextBox onChangeText={setTest} value={test} hideText={true} />*/}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
