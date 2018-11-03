import React, { Component } from 'react'
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

export default Post
