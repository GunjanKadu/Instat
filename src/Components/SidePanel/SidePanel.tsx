import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel/UserPanel';
import Channels from './Channels/Channels';
import * as I from '../../Interfaces/SidePanel';
import DirectMessages from './DirectMessages/DirectMessages';

class SidePanel extends Component<I.IOwnProps> {
  render() {
    const { currentUser } = this.props;
    return (
      <Menu
        size='large'
        inverted
        fixed='left'
        vertical
        style={{ background: '#3a133e', fontSize: '1.2rem' }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages />
      </Menu>
    );
  }
}

export default SidePanel;
