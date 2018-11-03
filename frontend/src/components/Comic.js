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

    const { getComic, getComicNavigation, match } = this.props;

    getComic(match.params.slug || 'last')
      .then((data) => {
        if(data.response.response.slug) {
          getComicNavigation(data.response.response.slug);
        }
      });
  }
  render() {
    // const { comic, navigation } = this.props;
    const comic = this.props.comic.data;
    const navigation = this.props.navigation.data;
    console.log('HIHIHI',comic, navigation)
    if(comic && navigation) {
      return <div styleName="Comic">
        <h2>{comic.response.title}</h2>

        <ComicNavigation {...navigation.response} />
        
        { navigation.response.nextSlug && <Link to={`/comic/${navigation.response.nextSlug}`} ></Link> }

        <img styleName="comic" src={`${COMICS_ROOT}${comic.response.slug}.png`} alt={comic.response.titleText} title={comic.response.titleText} />

        <ComicNavigation {...navigation.response} />

        <Post title={comic.response.title} post={comic.response.post} date={comic.response.date} />
      </div>
    }
    return <div>Loading</div>;
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
