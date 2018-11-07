import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getComics, deleteComic } from '~/actions';
import './Comics.css';

class Comics extends Component {
  constructor(props) {
    super(props);

    const { getComics, comics } = this.props;
    if(!comics) {
      getComics();
    }
    this.delete.bind(this);
  }
  delete(slug) {
    return () => this.props.deleteComic(slug).then(this.props.getComics)
  }
  renderComic(comic, i) {
    return <li key={i}>
      {comic.title}
      <Link to={`/comic/${comic.slug}`}>View</Link>
      <Link to={`/admin/comics/${comic.slug}`}>Edit</Link>
      <a onClick={this.delete(comic.slug)}>Delete</a>

    </li>
  }
  render() {
    const { comics } = this.props;
    if(!comics) {
      return <div styleName="Comics">
        <h2>Comics</h2>
        <p>Loading...</p>
      </div>;
    }
    return <div styleName="Comics">
      <h2>Comics</h2>
      <ul>
        { comics.map(this.renderComic.bind(this)) }  
      </ul>
    </div>
  }
}

Comics.propTypes = {
}

Comics = connect(state => {
  return {
    comics: state.comics.data ? state.comics.data.response : null
  }
}, {
  getComics,
  deleteComic
})(Comics)

export default Comics
