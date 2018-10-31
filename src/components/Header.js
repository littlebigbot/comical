import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(NavLink)
    return <header styleName="Header">
      <h1>Wayward Robot</h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/archive">Archive</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  }
}

Header.propTypes = {
}

Header = connect(state => state, {
})(Header)

export default Header
