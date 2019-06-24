import React, { Component } from 'react';
import {
        View,
        KeyboardAvoidingView,
        Text,
        TextInput,
        Platform,
        TouchableHighlight,
        TouchableOpacity,
        Image,
        ListView,
        ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import Voice from 'react-native-voice';
import Chat from './common/Chat';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class AudioScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: ds,
            recognized: '',
            pitch: '',
            error: '',
            end: '',
            started: false,
            results: [],
            partialResults: [],
            prevMessage: []
        };

        //Voice.onSpeechStart = this.onSpeechStart.bind(this);
        //Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        //Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        //Voice.onSpeechError = this.onSpeechError.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        //Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
        //Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }

    //onSpeechStart(e) { this.setState({started: true}) }
    //onSpeechRecognized(e) { this.setState({started: false}) }
    //onSpeechEnd(e) { this.setState({started: false}) }
    //onSpeechError(e) { this.setState({error: JSON.stringify(e.error)}) }

    onSpeechResults(e) { this.state.results.concat(this.setState({dataSource: ds.cloneWithRows([...this.state.prevMessage, e.value])})) }
    //onSpeechResults(e) { this.state.results.concat(this.setState({results: e.value})) }

    //onSpeechPartialResults(e) { this.setState({partialResults: e.value}) }
    //onSpeechVolumeChanged(e) { this.setState({pitch: e.value}) }

    async _onPressHandler(e) {
        if (this.state.started === false) {
            this.setState({
                recognized: '',
                pitch: '',
                error: '',
                started: true,
                results: [],
                partialResults: [],
                end: ''
            });
            try {
                await Voice.start('en-US');
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                await Voice.stop();
                await Voice.destroy();
            } catch (e) {
                console.error(e);
            }
            this.setState({
                recognized: '',
                pitch: '',
                error: '',
                started: false,
                results: [],
                partialResults: [],
                end: ''
            });
        }
    }
    
    async _startRecognizing(e) {
    }

    async _stopRecognizing(e) {
    }
    
    renderIcon = () => {
        if (this.state.started) {
            return <Image style={styles.button} source={require('./button_new.png')}/>;
        } else {
            return <Image style={styles.button} source={require('./button.png')}/>;
        }
    } 

    renderRow = (data) => {
        /*if (this.state.started === true) {
            return (<Text style={ styles.MessageBubbleContainer}>
                        {data}
                    </Text>);
        }*/
        return (<Text style={ styles.RecordBubbleContainer }>
                    {data}
                </Text>);
    }

    render() {
        const { MainContainer,
                InputContainer,
                TextInputBox,
                ButtonStyle
        } = styles;

        return(
            <KeyboardAvoidingView style={ MainContainer } behavior="padding">

                <ScrollView contentContainerStyle={ styles.MainContainer }>
                    <ListView
                        dataSource={ this.state.dataSource }
                        renderRow={(data) =>
                            this.renderRow(data)
                            /*
                            <Text style={ styles.RecordBubbleContainer }>
                                {data}
                            </Text>
                            */
                        }
                    />
                </ScrollView>

                <View style={ InputContainer }>
                    <View style={{ flex: 7 }}>

                        <TextInput
                            ref={ref => this.textInputRef = ref}
                            style={ TextInputBox }
                            onSubmitEditing = {() => {this.setState({prevMessage : [...this.state.prevMessage,this.state.sendMessage], dataSource: ds.cloneWithRows([...this.state.prevMessage,this.state.sendMessage])}), this.textInputRef.clear()}}
                            //onSubmitEditing = {console.log(this.state.prevMessage)}
                            onFocus={() => this.textInputRef.focus()}
                            onChangeText={ (value) => this.setState({ sendMessage: value })}
                            //onChangeText={ (value) => this.setState({prevMessage : [this.state.prevMessage, "/" ,this.state.sendMessage]})}

                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={this._onPressHandler.bind(this)}>
                            {this.state.started === false && <Image style={styles.button} source={require('./button_new.png')}/>}
                            {this.state.started === true && <Image style={styles.button} source={require('./button.png')}/>}
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.results.map((result, index) => {
                    return (
                        <Text key={`result-${index}`} style={styles.stat}>
                            {result}
                        </Text>
                    )
                })}
            </KeyboardAvoidingView>
        );
    }
}

                        //<TouchableOpacity onPress={this._startRecognizing.bind(this)}>
const styles = {
    MainContainer: {
        flex: 1
    },
    InputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    TextInputBox: {
        flex: 1,
        borderWidth: 3,
        borderColor:'rgb(108, 187, 219)',
        marginRight : 9,
        borderRadius : 10

    },
    ButtonStyle: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 45,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    button: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    action: {
        textAlign: 'center',
        color: '#0000FF',
        marginVertical: 5,
        fontWeight: 'bold',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    stat: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
    },
    MainContainer: {
        flex: 1,
        alighItems: 'flex-start',
        marginTop: parseInt(Platform.Version, 10) < 8 ? 0 : 40,
        margin: 10,
        borderWidth: 3,
        borderColor:'rgb(108, 187, 219)',
        borderRadius : 20


    },
    RecordBubbleContainer: {
        overflow : "hidden",
        color : "#ffffff",
        backgroundColor : 'rgb(108, 187, 219)',
        textAlign: 'left',
        borderRadius: 10,
        fontSize : 20,
        marginBottom : 10,
        marginTop : 10,
        marginLeft : 5,
        marginRight : 45,
        padding : 5
    },
    MessageBubbleContainer: {
        overflow : "hidden",
        color : "#ffffff",
        backgroundColor : 'rgb(226, 79, 79)',
        textAlign: 'right',
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

export default AudioScreen;
