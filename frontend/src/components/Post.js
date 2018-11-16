import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import './Post.css';
import marked from 'marked';

const Post = ({ date, title, post }) =>{
  
  const postHTML = marked(post);

  return <section styleName="Post">
    <header>
      <h2>{title}</h2>
      <Moment format="MMMM Do, YYYY">{date}</Moment>
    </header>
    <div styleName="content" dangerouslySetInnerHTML={{__html: postHTML}} />
  </section>
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired
}

export default Post
