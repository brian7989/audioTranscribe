import React, { Component } from 'react';
import { View, Text, ScrollView, ListView, Platform } from 'react-native';
import Bubble from './Bubble';

class Chat extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = { dataSource: ds.cloneWithRows(['Hi my name is Kevin', 'Nice to meet you', 'It looks like a beautiful day outside and sunny']) };
    }
    renderBubble = () => {
        <Bubble data="hello!!!!!!!!" color="blue"/>
    }
                //{ this.renderBubble() }
    render() {
        return(
            <ScrollView contentContainerStyle={ styles.MainContainer }>
                <ListView
                    dataSource={ this.state.dataSource }
                    renderRow={(data,i) =>
                        <View>
                        <Text style={ styles.BubbleContainer }>
                            {data}
                        </Text>
                        <Text style={ styles.myText }>
                            {data}
                        </Text>
                        </View>

                    }
                />
            </ScrollView>
        );
    }
}

const styles = {
    MainContainer: {
        flex: 1,
        alighItems: 'flex-start',
        marginTop: parseInt(Platform.Version, 10) < 8 ? 0 : 40,
        margin: 10,
        borderWidth: 3,
        borderColor:'rgb(108, 187, 219)',
        borderRadius : 20


    },
    BubbleContainer: {
        overflow : "hidden",
        color : "#ffffff",
        backgroundColor : 'rgb(108, 187, 219)',
        textAlign: 'center',
        borderRadius: 10,
        fontSize : 20,
        marginBottom : 10,
        marginTop : 10,
        marginLeft : 5,
        marginRight : 45,
        padding : 5
    },
    myText: {
      overflow : "hidden",
      color : 'rgb(108, 187, 219)',
      backgroundColor : "#ffffff",
      textAlign: 'center',
      borderRadius: 10,
      fontSize : 20,
      marginBottom : 10,
      marginTop : 5,
      marginLeft : 5,
      marginRight : 45,
      padding : 5,
      borderWidth : 3,
      borderColor : 'rgb(108, 187, 219)'
    }
}

export default Chat;
