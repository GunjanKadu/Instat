import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

interface IState {
  channels: Array<any>;
}
class Channels extends Component<{}, IState> {
  state = {
    channels: new Array(),
  };
  render() {
    const { channels } = this.state;
    return (
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name='exchange' /> CHANNELS
          </span>{' '}
          ({channels.length})<Icon name='add' />
        </Menu.Item>
        {/* Channels  */}
      </Menu.Menu>
    );
  }
}
export default Channels;
