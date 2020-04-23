import React from 'react';
import { Comment } from 'semantic-ui-react';
import * as I from '../../../Interfaces/Messages';
import { IUser } from '../../../Interfaces/Auth';
import moment from 'moment';

export default function Message({ message, user }: I.IPropsForMessage) {
  const isOwnMessage = (message: I.IMessage, user: IUser): string => {
    return message.user.id === user.uid ? 'message_self' : '';
  };
  const timeFromNow = (timestamp: {}) => moment(timestamp).fromNow();
  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as='a'>{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}
