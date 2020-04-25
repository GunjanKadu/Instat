/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github //github.com/GunjanKadu
 * @date   2020-04-25 23:46:09
 *
 */

import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import * as I from '../../../Interfaces/SidePanel';
import firebase from '../../../firebase';
import { IUser } from '../../../Interfaces/Auth';
import { connect } from 'react-redux';
import { setChannel, setPrivateChannel } from '../../../Store/Actions/index';

class DirectMessages extends Component<
  I.IDirectMessagesProps,
  I.IDirectMessagesState
> {
  state: I.IDirectMessagesState = {
    user: this.props.currentUser,
    users: [],
    usersRef: firebase.database().ref('users'),
    connectedRef: firebase.database().ref('.info/connected'),
    presenceRef: firebase.database().ref('presence'),
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }
  addListeners = (uid: string) => {
    let loadedUser: IUser[] = [];
    this.state.usersRef.on('child_added', (snap) => {
      if (uid !== snap.key) {
        let user: IUser = snap.val();
        user['uid'] = snap.key;
        user['status'] = 'offline';
        loadedUser.push(user);
        this.setState({ users: loadedUser });
      }
    });

    this.state.connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(uid);
        ref.set(true);
        ref.onDisconnect().remove((err: Error) => {
          console.log(err);
        });
      }
    });
    this.state.presenceRef.on('child_added', (snap) => {
      if (uid !== snap.key) {
        this.addStatusToUser(snap.key);
      }
    });
    this.state.presenceRef.on('child_removed', (snap) => {
      if (uid !== snap.key) {
        this.addStatusToUser(snap.key, false);
      }
    });
  };

  addStatusToUser = (userId: string, connected = true) => {
    const updatedUsers = this.state.users.reduce(
      (acc: IUser[], user: IUser): IUser[] => {
        if (user.uid === userId) {
          user['status'] = `${connected ? 'online' : 'offline'}`;
        }
        return acc.concat(user);
      },
      []
    );
    this.setState({ users: updatedUsers });
  };
  changeChannel = (user: IUser) => {
    const channelId = this.getChannelId(user.uid);
    const channelData = {
      id: channelId,
      name: user.name,
    };
    this.props.setCurrentChannel(channelData);
    this.props.setPrivateChannel(true);
  };
  getChannelId = (uid: string) => {
    const currentUserId = this.state.user.uid;
    return uid < currentUserId
      ? `${uid}/${currentUserId}`
      : `${currentUserId}/${uid}`;
  };
  isUserOnline = (user: IUser) => user.status === 'online';
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
        {users.map((user: IUser) => (
          <Menu.Item
            key={user.uid}
            onClick={() => this.changeChannel(user)}
            style={{ opacity: 0.7, fontStyle: 'italic' }}
          >
            <Icon
              name='circle'
              color={this.isUserOnline(user) ? 'green' : 'red'}
            />
            @{user.name}
          </Menu.Item>
        ))}
      </Menu.Menu>
    );
  }
}
const mapDispatchToProps = (dispatch: any): I.IDirectMessagesPropsRedux => {
  return {
    setCurrentChannel: (channel: any) => {
      dispatch(setChannel(channel));
    },
    setPrivateChannel: (value: boolean) => {
      dispatch(setPrivateChannel(value));
    },
  };
};
export default connect(null, mapDispatchToProps)(DirectMessages);
