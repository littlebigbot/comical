import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ComicNavigation from './ComicNavigation';
import Post from './Post';
import './Comic.css';

class Comic extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const { title } = this.props;
    const title = 'Hi Folks';
    const titleText = 'This is a secret';
    const nextId = '';
    const post = 'blahhhhhhh';
    const date = '';
    const currentId = '';
    return <div styleName="Comic">
      <h2>{title}</h2>
      <ComicNavigation currentId={''} previousId={''} nextId={''} />
      <Link to={`/comic/${nextId}`} >
        <img src={`/comics/${currentId}.png`} alt={titleText} title={titleText} />
      </Link>
      <ComicNavigation currentId={''} previousId={''} nextId={''} />
      <Post title={title} post={post} date={date} />
    </div>
  }
}

Comic.propTypes = {
}

Comic = connect(state => state, {
})(Comic)

export default Comic
