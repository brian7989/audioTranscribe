import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Router from './Router';
import AudioScreen from './components/AudioScreen';

class App extends Component {
    render() {
        return(
            <Router />
        );
    }
}

export default App;
