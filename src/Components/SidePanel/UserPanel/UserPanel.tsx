import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../../firebase';
import { TUser } from '../../../Interfaces/Auth';

interface IStateProps {
  currentUser?: TUser;
}
interface IState {
  user: TUser;
}

class UserPanel extends Component<IStateProps, IState> {
  state = {
    user: this.props.currentUser,
  };

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
    { text: <span>Change Avatar</span>, key: 'avatar' },
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
    const { user } = this.state;
    return (
      <Grid style={{ background: '#3a133e' }}>
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
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
