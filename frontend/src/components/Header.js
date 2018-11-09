import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import { isAuthenticated } from '~/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: isAuthenticated()
    }
  }
  render() {
    return <header styleName="Header">
      <Link to="/">
        <h1><small>The</small>Wayward<br/>Robot</h1>
      </Link>

      <nav>
        <ul>
          <li>
            <NavLink title="Home" exact to="/">
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink title="About" to="/about">
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink title="Archive" to="/archive">
              <span>Archive</span>
            </NavLink>
          </li>
          { this.state.isAuthenticated &&
              <li>
                <NavLink title="Admin" to="/admin">
                  <span>Admin</span>
                </NavLink>
              </li> }
        </ul>
      </nav>
    </header>
  }
}

Header.propTypes = {
}

export default Header
