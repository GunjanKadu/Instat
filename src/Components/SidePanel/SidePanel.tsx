/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:46:20
 *
 */

import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel/UserPanel';
import Channels from './Channels/Channels';
import * as I from '../../Interfaces/SidePanel';
import DirectMessages from './DirectMessages/DirectMessages';
import Starred from './Starred/Starred';

class SidePanel extends Component<I.IOwnProps> {
  render() {
    const { currentUser, primaryColor } = this.props;
    return (
      <Menu
        size='large'
        inverted
        fixed='left'
        vertical
        style={{ background: primaryColor, fontSize: '1.2rem' }}
      >
        <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
        <Starred currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
