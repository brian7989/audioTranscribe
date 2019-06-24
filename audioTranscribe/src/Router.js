import React from 'react';
import { TabNavigator } from 'react-navigation';

import AudioScreen from './components/AudioScreen';
import VideoScreen from './components/VideoScreen';

const Router = TabNavigator({
    audio: { screen: AudioScreen },
    video: { screen: VideoScreen }
});

export default Router;
