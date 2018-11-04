import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/pro-light-svg-icons';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(NavLink)
    return <header styleName="Header">
      <Link to="/">
        <h1><small>The</small>Wayward Robot</h1>
      </Link>

      <nav>
        <ul>
          <li>
            <NavLink title="Home" exact to="/">
              <span>Home</span>
              <FontAwesomeIcon size="2x" icon={Icons.faHome} />
            </NavLink>
          </li>
          <li>
            <NavLink title="About" to="/about">
              <span>About</span>
              <FontAwesomeIcon size="2x" icon={Icons.faQuestion} />
            </NavLink>
          </li>
          <li>
            <NavLink title="Archive" to="/archive">
              <span>Archive</span>
              <FontAwesomeIcon size="2x" icon={Icons.faArchive} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  }
}

Header.propTypes = {
}

export default Header
