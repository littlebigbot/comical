import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import './Post.css';
import marked from 'marked';

class Post extends Component {
  constructor(props) {
    super(props);
    this.rawMarkup = this.rawMarkup.bind(this);
  }
  rawMarkup(data) {
    const rawMarkup = marked(data);
    return { __html: rawMarkup };
  }
  render() {

    const { date, title, post } = this.props;

    return <section styleName="Post">
      <header>
        <h2>{title}</h2>
        <Moment format="MMMM Do, YYYY">{date}</Moment>
      </header>
      <div styleName="content" dangerouslySetInnerHTML={this.rawMarkup(post)} />
    </section>
  }
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired
}

export default Post
