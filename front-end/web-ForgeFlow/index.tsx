import React from 'react';
import { render } from 'react-dom';
import { View, Text } from 'react-native';
import Flow from './shared/components/flow';

const App = () => {
    return (
        <View style={{width: "100%", height: "100%"}}>
            <Text>TEST</Text>
            <Flow title="SPF1" description="Macarena ANEUNTONINEUH ( le mec qui vient pas à tek )" backgroundColor='#000000' textColor='#1F1F1F' icons={[require('@ressources/google.png'), require('@ressources/spotify.png')]} onPress={() => {}}/>
        </View>
    );
};

render(<App />, document.getElementById('root'));
