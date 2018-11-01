// This is just a blank template for faster
// creation of new components

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Archive.css';

class Archive extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div styleName="Archive">Archive</div>
  }
}

Archive.propTypes = {
}

Archive = connect(state => state, {
})(Archive)

export default Archive
