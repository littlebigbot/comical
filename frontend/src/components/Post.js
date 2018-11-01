// This is just a blank template for faster
// creation of new components

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div styleName="Post">
      <h2>{this.props.title}</h2>
      <div dangerouslySetInnerHTML={{__html: this.props.post}} />
    </div>
  }
}

Post.propTypes = {
}

Post = connect(state => state, {
})(Post)

export default Post
