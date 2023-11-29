import React from 'react';
import { render } from 'react-dom';
import { View, Text } from 'react-native';
import { Counter } from './shared/components/couter';

const App = () => {
    return (
        <View style={{width: "100%", height: "100%"}}>
            <Counter />
        </View>
    );
};

render(<App />, document.getElementById('root'));