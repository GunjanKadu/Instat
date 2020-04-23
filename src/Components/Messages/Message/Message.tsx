import React from 'react';
import { Comment, Image } from 'semantic-ui-react';
import * as I from '../../../Interfaces/Messages';
import { IUser } from '../../../Interfaces/Auth';
import moment from 'moment';

export default function Message({ message, user }: I.IPropsForMessage) {
  const isOwnMessage = (message: I.IMessage, user: IUser): string => {
    return message.user.id === user.uid ? 'message_self' : '';
  };
  const timeFromNow = (timestamp: {}) => moment(timestamp).fromNow();

  const isImage = (Message: I.IMessage): boolean => {
    return (
      message.hasOwnProperty('image') && !message.hasOwnProperty('content')
    );
  };

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as='a'>{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        {isImage(message) ? (
          <Image src={message.image} className='message_image' />
        ) : (
          <Comment.Text>{message.content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
}
