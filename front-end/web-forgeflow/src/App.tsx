import React from 'react';
import './App.css';
import Button from './components/Button';
import TextBox from './components/TextBox';

function App() {
  const [test, setTest] = React.useState<string>("");
  return (
    <div className="App">
      {/*<Button onPress={() => { }} title="LOGIN" backgroundColor='#E88741' icon={require("./res/google.png")} />
      <TextBox onChangeText={setTest} value={test} hideText={true} />*/}
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
