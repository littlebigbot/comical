import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const { date, title, post } = this.props;

    return <div styleName="Post">
      <h2>
        {title}
        <small>(<Moment format="YYYY/MM/DD">{date}</Moment>)</small>
      </h2>
      <div dangerouslySetInnerHTML={{__html: post}} />
    </div>
  }
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired
}

export default Post
