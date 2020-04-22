import React, { Component } from 'react';
import firebase from '../../../firebase';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import * as I from '../../../Interfaces/SidePanel';

class Channels extends Component<I.IProps, I.IChannel> {
  state = {
    user: this.props.currentUser,
    channels: new Array(),
    channelName: '',
    channelDetails: '',
    modal: false,
    channelsRef: firebase.database().ref('channels'),
  };

  componentDidMount() {
    this.addListeners();
  }
  addListeners = () => {
    let loadedChannels: any = [];
    this.state.channelsRef.on('child_added', (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels });
    });
  };
  openModal = (): void => this.setState({ modal: true });

  closeModal = (): void => this.setState({ modal: false });

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;
    const key = channelsRef.push().key;
    const newChannel: I.INewChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user?.displayName,
        avatar: user?.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: '' });
        this.closeModal();
        console.log('channel Added');
      })
      .catch((err: Error) => console.log(err));
  };

  handleChange = (event: { target: { name: any; value: any } }): void => {
    this.setState({ [event?.target.name]: event.target.value });
  };

  handleSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };
  displayChannels = (channels: I.IChannelArray[]) =>
    channels.length > 0 &&
    channels.map((channel: I.IChannelArray) => (
      <Menu.Item
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
      >
        #{channel.name}
      </Menu.Item>
    ));

  isFormValid = ({ channelName, channelDetails }: I.IChannel): boolean => {
    if (channelName && channelDetails) {
      return true;
    }
    return false;
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name='exchange' /> CHANNELS
            </span>{' '}
            ({channels.length})<Icon name='add' onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/*  Add Channel Model */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label='Name'
                  name='channelName'
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label='About'
                  name='channelDetails'
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.handleSubmit}>
              <Icon name='checkmark' />
              Add
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
export default Channels;
