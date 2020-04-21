import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel/UserPanel';
import { TUser } from '../../Interfaces/Auth';

interface IProps {
  currentUser?: TUser;
}
class SidePanel extends Component<IProps> {
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
      </Menu>
    );
  }
}

export default SidePanel;
