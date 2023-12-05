import React from 'react';
import { render } from 'react-dom';
import { View, Text } from 'react-native';
import { Counter } from './shared/components/couter';
import { myHome } from './pages/Home';

const App = () => {
    let page = myHome;

    return (
        <View style={{width: "100%", height: "100%"}}>
            {page}
        </View>
    );
};

render(<App />, document.getElementById('root'));