// This is just a blank template for faster
// creation of new components

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUp, login } from '~/actions';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: '',
        password: ''
      },
      signUp: {
        username: '',
        password: ''
      }
    }
  }
  render() {
    const { login, signUp } = this.state;
    return <div styleName="Login">
      <form onSubmit={e => { e.preventDefault(); this.props.login(login) }} >
        <h2>Login</h2>
        <input
          type="text"
          value={login.username}
          autoFocus={true}
          name="login-username"
          onChange={e => this.setState({login: { username: e.target.value, password: login.password}})}
        />
        <input
          type="password"
          value={login.password}
          name="login-password"
          onChange={e => this.setState({login: { username: login.username, password: e.target.value}})}
        />
        <button type="submit">Login</button>
      </form>

      <form onSubmit={e => { e.preventDefault(); this.props.signUp(signUp) }} >
        <h2>Sign Up</h2>
        <input
          type="text"
          value={signUp.username}
          name="sign-up-username"
          onChange={e => this.setState({signUp: { username: e.target.value, password: signUp.password}})}
        />
        <input
          type="password"
          value={signUp.password}
          name="sign-up-password"
          onChange={e => this.setState({signUp: { username: signUp.username, password: e.target.value}})}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  }
}

Login.propTypes = {
}

Login = connect(state => state, {
  signUp,
  login
})(Login)

export default Login
