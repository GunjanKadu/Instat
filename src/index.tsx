import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

export class Root extends React.Component<RouteComponentProps> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Router>
    <RootWithAuth />{' '}
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
