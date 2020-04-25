/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:46:33
 *
 */

import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { IRootState } from '../Store/Reducers/Index';
import * as I from '../Interfaces/App';

const App = (props: I.IProps): JSX.Element => {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />

      <SidePanel
        key={props.currentUser && props.currentUser.uid}
        currentUser={props.currentUser}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={props.currentChannel && props.currentChannel.id}
          currentChannel={props.currentChannel}
          currentUser={props.currentUser}
          isPrivateChannel={props.isPrivateChannel}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state: IRootState): I.IProps => {
  return {
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel,
  };
};
export default connect(mapStateToProps)(App);
