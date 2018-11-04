// This is just a blank template for faster
// creation of new components

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Error.css';

class Error extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div styleName="Error">Error!</div>
  }
}

Error.propTypes = {
}

Error = connect(state => state, {
})(Error)

export default Error
