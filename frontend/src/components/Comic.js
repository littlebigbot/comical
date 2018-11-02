import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getComic, getComicNavigation } from '~/actions'
import { COMICS_ROOT } from '~/constants'
import ComicNavigation from './ComicNavigation';
import Post from './Post';
import './Comic.css';

class Comic extends Component {
  constructor(props) {
    super(props);

    const { getComic, getComicNavigation } = this.props;
    
    getComic();
    getComicNavigation();
  }
  render() {
    const { comic, navigation } = this.props;
    return <div styleName="Comic">
      <h2>{comic.title}</h2>

      <ComicNavigation {...navigation} />
      
      <Link to={`/comic/${navigation.nextSlug}`} >
        <img src={`${COMICS_ROOT}${comic.slug}.png`} alt={comic.titleText} title={comic.titleText} />
      </Link>

      <ComicNavigation {...navigation} />

      <Post title={comic.title} post={comic.post} date={comic.date} />
    </div>
  }
}

Comic.propTypes = {
  comic: PropTypes.object,
  navigation: PropTypes.object,
  getComic: PropTypes.func,
  getComicNavigation: PropTypes.func
}

Comic = connect(state => state, {
  getComic,
  getComicNavigation
})(Comic)

export default Comic
