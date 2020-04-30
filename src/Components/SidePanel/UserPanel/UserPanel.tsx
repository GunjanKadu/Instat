/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu//
 * @date   2020-04-25 23:46:15
 *
 */

import React, { Component } from 'react';
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  GridColumn,
  Button,
} from 'semantic-ui-react';
import firebase from '../../../firebase';
import { TUser } from '../../../Interfaces/Auth';

interface IStateProps {
  currentUser?: TUser;
  primaryColor?: string;
}
interface IState {
  user: TUser;
  modal?: boolean;
}

class UserPanel extends Component<IStateProps, IState> {
  state = {
    user: this.props.currentUser,
    modal: false,
  };
  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  dropDownOption = () => [
    {
      text: (
        <span>
          Signed in as <strong>{this.state.user?.displayName}</strong>
        </span>
      ),
      key: 'user',
      disabled: true,
    },
    {
      text: <span onClick={this.openModal}>Change Avatar</span>,
      key: 'avatar',
    },
    {
      text: <span onClick={this.handleSignout}>Sign Out</span>,
      key: 'signout',
    },
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out!'));
  };
  render() {
    const { user, modal } = this.state;
    const { primaryColor } = this.props;
    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* Main Application Header */}
            <Header inverted floated='left' as='h2'>
              <Icon name='paper plane' />
              <Header.Content>Instat</Header.Content>
            </Header>
            {/* User DropDown */}
            <Header style={{ padding: '0.25em' }} as='h4' inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user?.photoURL} spaced='right' avatar />
                    {this.state.user?.displayName}
                  </span>
                }
                options={this.dropDownOption()}
              />
            </Header>
          </Grid.Row>
          {/* Change user avatar modal */}
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input fluid type='file' label='New Avatar' name='previewImage' />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <GridColumn className='ui center aligned grid'>
                    {/* Image Preview */}
                  </GridColumn>
                  <GridColumn>{/* Cropped Image Preview */}</GridColumn>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' inverted>
                <Icon name='save' />
                Change Avatar
              </Button>
              <Button color='green' inverted>
                <Icon name='image' />
                Preview
              </Button>
              <Button onClick={this.closeModal} color='red' inverted>
                <Icon name='remove' />
                Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
