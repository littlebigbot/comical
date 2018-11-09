import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './About.css';

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div styleName="About">
      <h2>About</h2>
      <p>So you want to know the story of Wayward Robot? Me too. We'll find out together.</p>
    </div>
  }
}

About.propTypes = {
}

export default About
