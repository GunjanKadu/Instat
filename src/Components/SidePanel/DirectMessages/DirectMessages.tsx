import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import * as I from '../../../Interfaces/SidePanel';

export default class DirectMessages extends Component<
  {},
  I.IDirectMessagesState
> {
  state: I.IDirectMessagesState = {
    users: [],
  };

  render() {
    const { users } = this.state;
    return (
      <Menu.Menu className='menu'>
        <Menu.Item>
          <span>
            <Icon name='mail' />
            DIRECT MESSASGES
          </span>
          {''} ({users.length})
        </Menu.Item>
        {/* Users TO send Direct messages */}
      </Menu.Menu>
    );
  }
}
