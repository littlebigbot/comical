// This is just a blank template for faster
// creation of new components

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Err.css';

class Err extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div styleName="Err"></div>
  }
}

Err.propTypes = {
}

Err = connect(state => state, {
})(Err)

export default Err
