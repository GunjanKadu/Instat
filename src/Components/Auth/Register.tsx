import React, { Component } from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import * as I from '../../Interfaces/Register';

class Register extends Component<{}, Partial<I.IRegister>> {
  state = {
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  handleChange = (event: { target: { name: string; value: string } }): void => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((createdUser) => {
        console.log(createdUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { userName, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='orange' textAlign='center'>
            <Icon name='puzzle piece' color='orange' />
            Register For DevChat
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name='userName'
                icon='user'
                iconPosition='left'
                placeholder='UserName'
                onChange={this.handleChange}
                value={userName}
                type='text'
              />
              <Form.Input
                fluid
                name='email'
                icon='mail'
                value={email}
                iconPosition='left'
                placeholder='Email'
                onChange={this.handleChange}
                type='text'
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                value={password}
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleChange}
                type='password'
              />
              <Form.Input
                fluid
                name='passwordConfirmation'
                icon='repeat'
                value={passwordConfirmation}
                iconPosition='left'
                placeholder='Password Confirmation'
                onChange={this.handleChange}
                type='password'
              />
              <Button color='orange' fluid type='submit' size='large'>
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
