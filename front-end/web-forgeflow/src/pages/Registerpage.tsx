import React from 'react';
import Button from '../components/Button';
import TextBox from '../components/TextBox';

export const Registerpage = () => {
  const [test, setTest] = React.useState<string>("");

  return (
    <div className="App">
      <header className="App-header">
        <Button onPress={() => { }} title="REGISTER" backgroundColor='#E88741' icon={require("../assets/google.png")} />
        <TextBox onChangeText={setTest} value={test} hideText={true} />
      </header>
    </div>
  );
}