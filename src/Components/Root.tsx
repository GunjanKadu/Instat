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
import { RootState } from '../Store/Reducers/Index';
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
        console.log(user);
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
const mapDispatchToProps = (dispatch: any): IDispatch => {
  return {
    setUser: (user: IUser) => {
      dispatch(setUser(user));
    },
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};
const mapStateToProps = (state: RootState): IState => {
  return {
    isLoading: state.user.isLoading,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
