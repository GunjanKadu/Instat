/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:46:38
 *
 */

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
import { IUser } from '../Interfaces/Auth';
import { IRootState } from '../Store/Reducers/Index';
import * as I from '../index';
import Spinner from '../spinner';

import { setUser, clearUser } from '../Store/Actions/index';

interface IDispatch {
  setUser: (user: any) => void;
  clearUser: () => void;
}
interface IState {
  isLoading: boolean;
}

type IProp = RouteComponentProps & IDispatch & IState;

class Root extends React.Component<IProp, {}> {
  componentDidMount() {
    console.log(this.props.isLoading);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    );
  }
}
const mapDispatchToProps = (dispatch: I.IDispatch): IDispatch => {
  return {
    setUser: (user: IUser) => {
      dispatch(setUser(user));
    },
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};
const mapStateToProps = (state: IRootState): IState => {
  return {
    isLoading: state.user.isLoading,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
