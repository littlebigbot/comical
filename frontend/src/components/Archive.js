// This is just a blank template for faster
// creation of new components

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getComics } from '~/actions';
import './Archive.css';

class Archive extends Component {
  constructor(props) {
    super(props);

    const { getComics, comics } = this.props;
    if(!comics) {
      getComics();
    }
  }
  renderComic(comic, i) {
    return <li key={i}>
      <Link to={`/comic/${comic.slug}`}>
        <h3>{comic.title}</h3>
        <img src={comic.thumbnail} alt={comic.title} />
      </Link>
    </li>
  }
  render() {
    const { comics } = this.props;
    if(!comics) {
      return <div styleName="Archive">
        <h2>Archive</h2>
        <p>Loading...</p>
      </div>;
    }
    return <div styleName="Archive">
      <h2>Archive</h2>
      <ul>
        { comics.map(this.renderComic.bind(this)) }  
      </ul>
    </div>
  }
}

Archive.propTypes = {
}

Archive = connect(state => {
  return {
    comics: state.comics.data ? state.comics.data.response : null
  }
}, {
  getComics
})(Archive)

export default Archive
