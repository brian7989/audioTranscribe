import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class Bubble extends Component {
    render() {
        const { data, color } = this.props;
        return(
            <View>
                <Text style={{ color: color }}>{ data }</Text>
            </View>
        );
    }
}

export default Bubble;
