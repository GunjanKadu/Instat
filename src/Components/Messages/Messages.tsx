import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader/MessagesHeader';
import MessagesForm from './MessageForm/MessageForm';
class Messages extends Component {
  render() {
    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>{/* Messages */}</Comment.Group>
        </Segment>
        <MessagesForm />
      </React.Fragment>
    );
  }
}

export default Messages;
