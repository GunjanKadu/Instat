import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessagesForm from './MessageForm/MessageForm';
import firebase from '../../firebase';
import Message from './Message/Message';
import * as I from '../../Interfaces/Messages';

class Messages extends Component<I.IMessagesProp, I.IStateMessage> {
  state = {
    messagesRef: firebase.database().ref('messages'),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messages: new Array(),
    messagesLoading: true,
  };

  componentDidMount() {
    const { channel, user } = this.state;
    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = (channelId: string) => {
    this.addMessageListeners(channelId);
  };
  addMessageListeners = (channelId: string) => {
    let loadedMessages: I.IMessage[] = [];
    this.state.messagesRef.child(channelId).on('child_added', (snap) => {
      loadedMessages.push(snap.val());
      this.setState({ messages: loadedMessages, messagesLoading: false });
    });
  };
  displayMessages = (messages: I.IMessage[]) =>
    messages.length > 0 &&
    messages.map((message: I.IMessage) => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));
  render() {
    const { messagesRef, messages, channel, user } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessagesForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
