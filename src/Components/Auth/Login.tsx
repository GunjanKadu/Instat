/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github //github.com/GunjanKadu
 * @date   2020-04-25 23:44:35
 *
 */

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
import * as I from '../../Interfaces/Auth';

class Login extends Component<{}, I.ILogin> {
  state: I.ILogin = {
    userName: '',
    email: '',
    password: '',
    errors: [],
    loading: false,
  };

  displayError = (errors: any[]) =>
    errors.map((error: { message: React.ReactNode }, i: number) => (
      <p key={i}>{error.message}</p>
    ));

  handleChange = (event: { target: { name: string; value: string } }): void => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };
  isFormValid = ({ email, password }: I.ILogin) => email && password;

  handleInputError = (errors: any, inputName: string) => {
    return errors.some((error: any) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };
  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='orange' textAlign='center'>
            <Icon name='code branch' color='orange' />
            Login To DevChat
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name='email'
                icon='mail'
                value={email}
                iconPosition='left'
                placeholder='Email'
                onChange={this.handleChange}
                type='text'
                className={this.handleInputError(errors, 'email')}
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                value={password}
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleChange}
                className={this.handleInputError(errors, 'password')}
                type='password'
              />

              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color='orange'
                fluid
                type='submit'
                size='large'
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>{this.displayError(this.state.errors)}</Message>
          )}
          <Message>
            Don't Have an Account? <Link to='/register'>Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Login;
