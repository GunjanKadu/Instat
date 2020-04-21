import {
  RouteComponentProps,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import React from 'react';
import firebase from 'firebase';
import App from './App';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { connect } from 'react-redux';
import { setUser } from '../Store/Actions/index';
import { IUser } from '../Interfaces/Auth';

interface IDispatch {
  setUser: (user: any) => void;
}

type IProp = RouteComponentProps & IDispatch;

class Root extends React.Component<IProp> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.props.setUser(user);
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    );
  }
}
const mapDispatchToProps = (dispatch: any): IDispatch => {
  return {
    setUser: (user: IUser) => {
      dispatch(setUser(user));
    },
  };
};
export default withRouter(connect(null, mapDispatchToProps)(Root));
