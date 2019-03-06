import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import XMPP from 'react-native-xmpp'
import { GiftedChat } from 'react-native-gifted-chat'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  state = {
    messages: []
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  componentDidMount() {
    XMPP.trustHosts(['ar-it01643.globant.com']);
    XMPP.on('message', (message) => {
      const messageObject = {
        _id: 100,
        text: message.body,
        createdAt: new Date(),
        user: {
          _id: 3,
          name: message.from,
          avatar: 'https://placeimg.com/140/140/any',
        },
      }
      console.log('MESSAGE: ' + message + ' received')
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messageObject),
      }))
    });
    XMPP.on('iq', (message) => console.log('IQ:' + JSON.stringify(message)));
    XMPP.on('presence', (message) => console.log('PRESENCE:' + JSON.stringify(message)));
    XMPP.on('error', (message) => console.log('ERROR:' + message));
    XMPP.on('loginError', (message) => console.log('LOGIN ERROR:' + message));
    XMPP.on('login', (message) => console.log('LOGGED!'));
    XMPP.on('connect', (message) => console.log('CONNECTED!'));
    XMPP.on('disconnect', (message) => console.log('DISCONNECTED!'));
    XMPP.connect('franco@ar-it01643.globant.com', '1234');
  }

  onSend = (messages = []) => {
    messages => XMPP.message(messages[0].text, 'franco@ar-it01643.globant.com')
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
