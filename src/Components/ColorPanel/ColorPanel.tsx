/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github //github.com/GunjanKadu
 * @date   2020-04-25 23:44:55
 *
 */

import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button } from 'semantic-ui-react';

class ColorPanel extends Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        icon='labeled'
        inverted
        vertical
        visible
        width='very thin'
      >
        <Divider />
        <Button icon='add' size='small' color='blue' />
      </Sidebar>
    );
  }
}

export default ColorPanel;
