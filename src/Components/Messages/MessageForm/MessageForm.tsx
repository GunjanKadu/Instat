import React, { Component } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import * as I from '../../../Interfaces/Messages';
import firebase from '../../../firebase';
import FileModal from '../FileModal/FileModal';

export default class MessageForm extends Component<
  I.IPropsMessageForm,
  I.IStateMessageForm
> {
  state = {
    message: '',
    loading: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    errors: new Array(),
    modal: false,
  };
  openModal = () => {
    this.setState({ modal: true });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };
  handleChange = (event: { target: { name: any; value: any } }): void => {
    this.setState({ [event.target.name]: event.target.value });
  };
  uploadFIle = (file: I.IFileModalFile, metaData: I.IFileModalMetaData) => {
    console.log(file, metaData);
  };
  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: '', errors: [] });
        })
        .catch((err: Error) => {
          console.log(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: 'Add A Message' }),
      });
    }
  };
  createMessage = (): I.IMessage => {
    const message: I.IMessage = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      content: this.state.message,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
    };
    console.log(message);
    return message;
  };
  render() {
    const { errors, message, loading, modal } = this.state;
    return (
      <Segment className='message_form'>
        <Input
          fluid
          name='message'
          onChange={this.handleChange}
          value={message}
          style={{ marginBottom: '0.7em' }}
          label={<Button icon='add'></Button>}
          labelPosition='left'
          placeholder='Write Your Message'
          className={
            errors.some((error) => error.message.includes('Message'))
              ? 'error'
              : ''
          }
        />
        <Button.Group icon widths='2'>
          <Button
            onClick={this.sendMessage}
            color='orange'
            disabled={loading}
            content='Add Reply'
            labelPosition='left'
            icon='edit'
          />
          <Button
            color='teal'
            onClick={this.openModal}
            content='Upload Media'
            labelPosition='right'
            icon='cloud upload'
          />
          <FileModal
            modal={modal}
            closeModal={this.closeModal}
            uploadFile={this.uploadFIle}
          />
        </Button.Group>
      </Segment>
    );
  }
}
