import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
class UserPanel extends Component {
  dropDownOption = () => [
    {
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      key: 'user',
      disabled: true,
    },
    { text: <span>Change Avatar</span>, key: 'avatar' },
    { text: <span>Sign Out</span>, key: 'signout' },
  ];
  render() {
    return (
      <Grid style={{ background: '#3a133e' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* Main Application Header */}
            <Header inverted floated='left' as='h2'>
              <Icon name='paper plane' />
              <Header.Content>Instat</Header.Content>
            </Header>
          </Grid.Row>
          {/* User DropDown */}
          <Header style={{ padding: '0.25em' }} as='h4' inverted>
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropDownOption()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
