import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { IRootState } from '../Store/Reducers/Index';
import { TUser } from '../Interfaces/Auth';

interface IProps {
  currentUser?: TUser;
}
const App = (props: IProps): JSX.Element => {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />

      <SidePanel currentUser={props.currentUser} />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = (state: IRootState): IProps => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(App);
