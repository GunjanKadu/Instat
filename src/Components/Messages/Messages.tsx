/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:45:35
 *
 */

import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessagesForm from './MessageForm/MessageForm';
import firebase from '../../firebase';
import Message from './Message/Message';
import { connect } from 'react-redux';
import * as I from '../../Interfaces/Messages';
import { IChannelArray } from '../../Interfaces/SidePanel';
import { IDispatch } from '../..';
import { setUserPosts } from '../../Store/Actions';

class Messages extends Component<I.IMessagesProp, I.IStateMessage> {
  state: I.IStateMessage = {
    messagesRef: firebase.database().ref('messages'),
    privateMessagesRef: firebase.database().ref('privateMessages'),
    channel: this.props.currentChannel,
    privateChannel: this.props.isPrivateChannel,
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    messages: [],
    messagesLoading: true,
    numUniqueUsers: '',
    searchTerm: '',
    searchLoading: false,
    searchResult: [],
    isChannelStarred: false,
  };

  componentDidMount() {
    const { channel, user } = this.state;
    if (channel && user) {
      this.addListeners(channel.id);
      this.addUserStarsListeners(channel.id, user.uid);
    }
  }

  addListeners = (channelId: string) => {
    this.addMessageListeners(channelId);
  };
  addMessageListeners = (channelId: string) => {
    let loadedMessages: I.IMessage[] = [];
    const ref = this.getMessagesRef();
    ref.child(channelId).on('child_added', (snap) => {
      loadedMessages.push(snap.val());
      this.setState({ messages: loadedMessages, messagesLoading: false });

      this.countUniqueUsers(loadedMessages);
      this.countUserPosts(loadedMessages);
    });
  };
  addUserStarsListeners = (channelId: string, userId: string) => {
    this.state.usersRef
      .child(userId)
      .child('starred')
      .once('value')
      .then((data: any) => {
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val());
          const prevStarred = channelIds.includes(channelId);
          this.setState({ isChannelStarred: prevStarred });
        }
      });
  };
  countUniqueUsers = (messages: I.IMessage[]) => {
    const uniqueUsers = messages.reduce(
      (acc: Array<string>, message: I.IMessage): any => {
        if (!acc.includes(message.user.name)) {
          acc.push(message.user.name);
        }
        return acc;
      },
      []
    );
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`;
    this.setState({ numUniqueUsers: numUniqueUsers });
  };
  countUserPosts = (messages: I.IMessage[]) => {
    let userPosts = messages.reduce((acc: any, message: I.IMessage): any => {
      if (message.user.name in acc) {
        acc[message.user.name].count += 1;
      } else {
        acc[message.user.name] = {
          avatar: message.user.avatar,
          count: 1,
        };
      }
      return acc;
    }, {});
    this.props.setUserPosts(userPosts);
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
    return channel
      ? `${this.state.privateChannel ? '@' : '#'}${channel.name}`
      : '';
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
      (acc: I.IMessage[], message: I.IMessage): Array<I.IMessage> => {
        if (
          (message.content && message.content.match(regex)) ||
          message.user.name.match(regex)
        ) {
          acc.push(message);
        }
        return acc;
      },
      []
    );
    this.setState({ searchResult: searchResults });
    setTimeout(() => {
      this.setState({ searchLoading: false });
    }, 1000);
  };

  getMessagesRef = (): firebase.database.Reference => {
    const { messagesRef, privateMessagesRef, privateChannel } = this.state;
    return privateChannel ? privateMessagesRef : messagesRef;
  };
  handleStar = (): void => {
    this.setState(
      (prevState: I.IStateMessage) => ({
        isChannelStarred: !prevState.isChannelStarred,
      }),
      () => this.starChannel()
    );
  };
  starChannel = (): void => {
    if (this.state.isChannelStarred) {
      this.state.usersRef.child(`${this.state.user.uid}/starred`).update({
        [this.state.channel.id]: {
          name: this.state.channel.name,
          details: this.state.channel.details,
          createdBy: {
            name: this.state.channel.createdBy.name,
            avatar: this.state.channel.createdBy.avatar,
          },
        },
      });
    } else {
      this.state.usersRef
        .child(`${this.state.user.uid}/starred`)
        .child(this.state.channel.id)
        .remove((err: Error) => {
          if (err !== null) {
            console.error(err);
          }
        });
    }
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
      searchLoading,
      privateChannel,
      isChannelStarred,
    } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(channel)}
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          searchLoading={searchLoading}
          privateChannel={privateChannel}
          handleStar={this.handleStar}
          isChannelStar={isChannelStarred}
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
          privateChannel={privateChannel}
          getMessagesRef={this.getMessagesRef}
        />
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch: IDispatch): I.IMessageReduxProps => {
  return {
    setUserPosts: (userPost: any) => dispatch(setUserPosts(userPost)),
  };
};
export default connect(null, mapDispatchToProps)(Messages);
