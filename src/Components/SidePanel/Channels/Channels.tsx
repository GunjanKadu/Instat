import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

interface IState {
  channels?: Array<any>;
  modal?: boolean;
  channelName?: string;
  channelDetails?: string;
}
class Channels extends Component<{}, IState> {
  state = {
    channels: new Array(),
    channelName: '',
    channelDetails: '',
    modal: false,
  };

  openModal = (): void => this.setState({ modal: true });
  closeModal = (): void => this.setState({ modal: false });

  handleChange = (event: { target: { name: any; value: any } }): void => {
    this.setState({ [event?.target.name]: event.target.value });
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
          {/* Channels  */}
        </Menu.Menu>

        {/*  Add Channel Model */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add Channel</Modal.Header>
          <Modal.Content>
            <Form>
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
            <Button color='green' inverted>
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
