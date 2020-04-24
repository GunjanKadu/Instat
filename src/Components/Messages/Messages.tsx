import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessagesForm from './MessageForm/MessageForm';
import firebase from '../../firebase';
import Message from './Message/Message';
import * as I from '../../Interfaces/Messages';
import { IChannelArray } from '../../Interfaces/SidePanel';

class Messages extends Component<I.IMessagesProp, I.IStateMessage> {
  state: I.IStateMessage = {
    messagesRef: firebase.database().ref('messages'),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messages: new Array(),
    messagesLoading: true,
    numUniqueUsers: '',
    searchTerm: '',
    searchLoading: false,
    searchResult: new Array(),
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

      this.countUniqueUsers(loadedMessages);
    });
  };
  countUniqueUsers = (messages: I.IMessage[]) => {
    const uniqueUsers = messages.reduce((acc: any, message: any): any => {
      console.log(acc);
      console.log(message);
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`;
    this.setState({ numUniqueUsers: numUniqueUsers });
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
  displayChannelName = (channel: IChannelArray): string => {
    return channel ? `#${channel.name}` : '';
  };

  handleSearchChange = (event: { target: { value: any } }): void => {
    this.setState({ searchTerm: event.target.value, searchLoading: true }, () =>
      this.handleSearchMessages()
    );
  };
  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, 'gi');
    const searchResults = channelMessages.reduce(
      (acc: any, message: I.IMessage): Array<any> => {
        if (message.content && message.content.match(regex)) {
          acc.push(message);
        }
        return acc;
      },
      []
    );
    this.setState({ searchResult: searchResults });
  };
  render() {
    const {
      messagesRef,
      messages,
      channel,
      user,
      numUniqueUsers,
      searchTerm,
      searchResult,
    } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader
          channelName={() => this.displayChannelName(channel)}
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
        />
        <Segment>
          <Comment.Group className='messages'>
            {searchTerm
              ? this.displayMessages(searchResult)
              : this.displayMessages(messages)}
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
