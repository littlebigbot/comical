import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import LightIcons from '@fortawesome/fontawesome-pro-light';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(NavLink)
    return <header styleName="Header">
      <h1><small>The</small> Wayward Robot</h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <FontAwesomeIcon icon={LightIcons.faHome} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <FontAwesomeIcon icon={LightIcons.faQuestion} />
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/archive">
              <FontAwesomeIcon icon={LightIcons.faArchive} />
              <span>Archive</span>
            </NavLink>
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
