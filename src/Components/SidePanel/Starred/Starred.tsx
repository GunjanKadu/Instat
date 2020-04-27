/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github //github.com/GunjanKadu
 * @date   2020-04-27 11:49:48
 *
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setChannel, setPrivateChannel } from '../../../Store/Actions/index';
import * as I from '../../../Interfaces/SidePanel';
import { IDispatch } from '../../../index';

class Starred extends Component<I.IStarredProps, I.IStarredState> {
  state: I.IStarredState = {
    starredChannels: [],
    activeChannel: '',
  };
  changeChannel = (channel: I.IChannelArray): void => {
    this.setActiveChannel(channel);
    this.props.setChannel(channel);
    this.props.setPrivateChannel(false);
  };
  displayChannels = (starredChannels: any) =>
    starredChannels.length > 0 &&
    starredChannels.map((channel: any) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        #{channel.name}
      </Menu.Item>
    ));

  setActiveChannel = (channel: I.IChannelArray) => {
    this.setState({ activeChannel: channel.id });
  };

  render() {
    const { starredChannels } = this.state;
    return (
      <Menu.Menu className='menu'>
        <Menu.Item>
          <span>
            <Icon name='star' /> STARRED
          </span>{' '}
          ({starredChannels.length})
        </Menu.Item>
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
    );
  }
}
const mapDispatchToProps = (dispatch: IDispatch): I.IStarredReduxProps => {
  console.log(dispatch);
  return {
    setChannel: (channel: I.IChannelArray) => {
      dispatch(setChannel(channel));
    },
    setPrivateChannel: (value: boolean) => {
      dispatch(setPrivateChannel(value));
    },
  };
};
export default connect(null, mapDispatchToProps)(Starred);
