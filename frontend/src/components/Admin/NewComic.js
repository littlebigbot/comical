import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createComic } from '~/actions';
import './NewComic.css';

class NewComic extends Component {
  constructor(props) {
    super(props);
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
    
    this.props.createComic(this.state);
  }
  render() {
    const { title, slug, titleText, post } = this.state;
    return <div styleName="NewComic">
      <h2>New Comic</h2>
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
        <input
          type="file"
          name="image"
          required
          onChange={e => this.setState({image: e.target.files[0]})}
        />
        <textarea
          name="post"
          value={post}
          placeholder="Post"
          required
          onChange={e => this.setState({post: e.target.value})}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  }
}

NewComic.propTypes = {
}

NewComic = connect(state => state, {
  createComic
})(NewComic)

export default NewComic
