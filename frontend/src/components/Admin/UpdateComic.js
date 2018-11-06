import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateComic, getComic } from '~/actions';
import './UpdateComic.css';

class UpdateComic extends Component {
  constructor(props) {
    super(props);

    const { getComic, match } = this.props;

    getComic(match.params.slug || 'last')
      .then((data) => {
        const { comic } = this.props;
        this.setState(comic)
      });
    this.state = {
      title: '',
      slug: '',
      titleText: '',
      post: '',
      image: null
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    
    this.props.updateComic(this.state, this.props.comic.slug);
  }
  render() {
    const { title, slug, titleText, post, image, urlImage, date } = this.state;
    return <div styleName="UpdateComic">
      <h2>Update Comic</h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          required
          onChange={e => this.setState({title: e.target.value})}
        />
        <input
          type="text"
          name="slug"
          value={slug}
          placeholder="Slug"
          required
          onChange={e => this.setState({slug: e.target.value})}
        />
        <input
          type="text"
          name="titleText"
          value={titleText}
          placeholder="Title Text"
          required
          onChange={e => this.setState({titleText: e.target.value})}
        />
        {/*<input
          type="date"
          name="date"
          value={date}
          required
          onChange={e => this.setState({date: e.target.value})}
        />*/}
        <input
          type="file"
          name="image"
          onChange={e => this.setState({image: e.target.files[0], urlImage: URL.createObjectURL(e.target.files[0])})}
        />
        { typeof image === 'string'
           ? <img src={image} />
           : <img src={urlImage} />
         }
        <textarea
          name="post"
          value={post}
          placeholder="Post"
          required
          onChange={e => this.setState({post: e.target.value})}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  }
}

UpdateComic.propTypes = {
}

UpdateComic = connect(state => {
  return {
    comic: state.comic.data ? state.comic.data.response : null
  }
}, {
  getComic,
  updateComic
})(UpdateComic)

export default UpdateComic
