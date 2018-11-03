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
  componentDidUpdate(prevProps) {
    if(prevProps.match.params.slug !== this.props.match.params.slug) {
      const { getComic, getComicNavigation, match } = this.props;

      getComic(match.params.slug || 'last')
        .then((data) => {
          if(data.response.response.slug) {
            getComicNavigation(data.response.response.slug);
          }
        });
    }
  }
  render() {
    const { comic, navigation, loading } = this.props;
    if(comic && navigation && !loading) {
      return <div styleName="Comic">
        <h2>{comic.title}</h2>
        <ComicNavigation {...navigation} />
        
        <div styleName="comic-wrap">
          { navigation.nextSlug && <Link to={`/comic/${navigation.nextSlug}`} ></Link> }

          <img src={`${COMICS_ROOT}${comic.slug}.png`} alt={comic.titleText} title={comic.titleText} />
        </div>

        <ComicNavigation {...navigation} />

        <Post title={comic.title} post={comic.post} date={comic.date} />
      </div>
    }
    return <div>Loading</div>;
  }
}

Comic.propTypes = {
  comic: PropTypes.object,
  navigation: PropTypes.object,
  getComic: PropTypes.func,
  getComicNavigation: PropTypes.func,
  loading: PropTypes.bool
}

Comic = connect(state => {

  return {
    comic: state.comic.data ? state.comic.data.response : null,
    loading: state.comic.loading,
    navigation: state.navigation.data ? state.navigation.data.response : null
  }
}, {
  getComic,
  getComicNavigation
})(Comic)

export default Comic
