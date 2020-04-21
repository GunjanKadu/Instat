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
    errors: [],
  };

  displayError = (errors: any[]) =>
    errors.map((error: { message: React.ReactNode }, i: number) => (
      <p key={i}>{error.message}</p>
    ));

  isFormValid = (): boolean => {
    let errors: any = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in All fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (this.isPasswordValid(this.state)) {
      error = { message: 'Password is Invalid' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty({
    userName,
    email,
    password,
    passwordConfirmation,
  }: I.IRegister): boolean {
    if (!userName || !email || !password || !passwordConfirmation) {
      return true;
    } else {
      return false;
    }
    //return !userName || !email || !password || !passwordConfirmation;
  }

  isPasswordValid({ password, passwordConfirmation }: I.IRegister): boolean {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return true;
    } else if (password !== passwordConfirmation) {
      return true;
    } else {
      return false;
    }
  }

  handleChange = (event: { target: { name: string; value: string } }): void => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event: React.SyntheticEvent): void => {
    if (this.isFormValid()) {
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
    }
  };
  render() {
    const {
      userName,
      email,
      password,
      passwordConfirmation,
      errors,
    } = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='red' textAlign='center'>
            <Icon name='puzzle piece' color='red' />
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
              <Button color='red' fluid type='submit' size='large'>
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>{this.displayError(this.state.errors)}</Message>
          )}
          <Message>
            Already a user? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Register;
