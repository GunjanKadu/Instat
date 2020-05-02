/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:43:18
 *
 */
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { Segment, Button, Input } from 'semantic-ui-react';

import * as I from '../../../Interfaces/Messages';
import firebase from '../../../firebase';
import FileModal from './FileModal/FileModal';
import ProgressBar from './ProgressBar/ProgressBar';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default class MessageForm extends Component<
  I.IPropsMessageForm,
  I.IStateMessageForm
> {
  state: I.IStateMessageForm = {
    message: '',
    loading: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    errors: [],
    modal: false,
    uploadState: '',
    uploadTask: null,
    storageRef: firebase.storage().ref(),
    typingRef: firebase.database().ref('typing'),
    percentUploaded: 0,
    emojiPicker: false,
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
  getPath = () => {
    if (this.props.privateChannel) {
      return `chat/private-${this.state.channel.id}`;
    } else {
      return `chat/public`;
    }
  };
  uploadFIle = (file: any, metaData: I.IFileModalMetaData) => {
    const pathToUpload = this.state.channel.id;
    const ref = this.props.getMessagesRef();
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: 'uploading',
        uploadTask: this.state.storageRef.child(filePath).put(file, metaData),
      },
      () => {
        this.state.uploadTask.on(
          'state_changed',
          (snap: any) => {
            const percentUploaded =
              Math.round(snap.bytesTransferred / snap.totalBytes) * 100;
            this.setState({ percentUploaded: percentUploaded });
          },
          (err: Error) => {
            console.log(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: 'error',
              uploadTask: null,
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadUrl: string) => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch((err: Error) => {
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: 'error',
                  uploadTask: null,
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl: string, ref: any, pathToUpload: string) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: 'done' });
      })
      .catch((err: Error) => {
        this.setState({
          errors: this.state.errors.concat(err),
        });
      });
  };
  sendMessage = () => {
    const { getMessagesRef } = this.props;
    const { message, channel, user, typingRef } = this.state;
    if (message) {
      this.setState({ loading: true });
      getMessagesRef()
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: '', errors: [] });
          typingRef.child(channel.id).child(user.uid).remove();
        })
        .catch((err: Error) => {
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
  handleKeyDown = () => {
    const { message, typingRef, channel, user } = this.state;
    if (message) {
      typingRef.child(channel.id).child(user.uid).set(user.displayName);
    } else {
      typingRef.child(channel.id).child(user.uid).remove();
    }
  };
  handleTogglePicker = () => {
    this.setState({ emojiPicker: !this.state.emojiPicker });
  };
  handleEmojiSelect = (emoji: I.IEmoji): void => {
    console.log(emoji);
    const oldMessage: string = this.state.message;
    const newMessage: string = this.colonToUnicode(
      `${oldMessage} ${emoji.colons}`
    );
    this.setState({ message: newMessage, emojiPicker: false });
  };
  colonToUnicode = (message: string): string => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, (x: string) => {
      x = x.replace(/:/g, '');
      let emoji: any = emojiIndex.emojis[x];
      if (typeof emoji !== 'undefined') {
        let unicode = emoji.native;
        if (typeof unicode !== 'undefined') {
          return unicode;
        }
      }
      x = ':' + x + ':';
      return x;
    });
  };
  createMessage = (fileUrl: any = null): I.IMessage => {
    const message: I.IMessage = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
    };
    if (fileUrl !== null) {
      message['image'] = fileUrl;
    } else {
      message['content'] = this.state.message;
    }
    console.log(message);
    return message;
  };

  render() {
    const {
      errors,
      message,
      loading,
      modal,
      uploadState,
      percentUploaded,
      emojiPicker,
    } = this.state;
    return (
      <Segment className='message_form'>
        {emojiPicker && (
          <Picker
            onSelect={this.handleEmojiSelect}
            set='apple'
            title='Pick Your Emoji'
            emoji='point_up'
          />
        )}
        <Input
          fluid
          name='message'
          onChange={this.handleChange}
          value={message}
          onKeyDown={this.handleKeyDown}
          style={{ marginBottom: '0.7em' }}
          label={<Button icon='add' onClick={this.handleTogglePicker} />}
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
            disabled={uploadState === 'uploading'}
            onClick={this.openModal}
            content='Upload Media'
            labelPosition='right'
            icon='cloud upload'
          />
        </Button.Group>
        <FileModal
          modal={modal}
          closeModal={this.closeModal}
          uploadFile={this.uploadFIle}
        />
        <ProgressBar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
      </Segment>
    );
  }
}
