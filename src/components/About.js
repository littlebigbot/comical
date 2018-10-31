// This is just a blank template for faster
// creation of new components

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './About.css';

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div styleName="About">About</div>
  }
}

About.propTypes = {
}

About = connect(state => state, {
})(About)

export default About
