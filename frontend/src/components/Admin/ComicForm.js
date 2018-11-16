import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './ComicForm.css';
import { isEqual } from 'lodash';
import marked from 'marked';

class ComicForm extends Component {
  constructor(props) {
    super(props);

    const defaultState = {
      title: '',
      slug: '',
      titleText: '',
      post: '',
      image: null,
      tags: '',
      script: ''
    }
    this.state = props.comic || defaultState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(key) {
    return e => {
      this.setState({
        [key]: e.target.value
      })
    }
  }
  // componentDidUpdate(prevProps) {
  //   console.log('Am I here?')
  //   if(!isEqual(prevProps.comic, this.props.comic)) {
  //     this.setState(this.props.comic);
  //   }
  // }
  handleSubmit(e) {
    e.preventDefault();

    return this.props.onSubmit(this.state)
  }
  render() {
    const { title, slug, titleText, post, image, urlImage, date, script, tags } = this.state;

    return <form styleName="ComicForm" onSubmit={this.handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="Title"
        required
        onChange={this.handleChange('title')}
      />
      <input
        type="text"
        name="slug"
        value={slug}
        placeholder="Slug"
        required
        onChange={this.handleChange('slug')}
      />
      <input
        type="text"
        name="titleText"
        value={titleText}
        placeholder="Title Text"
        required
        onChange={this.handleChange('titleText')}
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
        onChange={this.handleChange('post')}
      />
      <div styleName="post-html" dangerouslySetInnerHTML={{__html: marked(post)}} />
      <textarea
        name="script"
        value={script}
        placeholder="Script"
        required
        onChange={this.handleChange('script')}
      />
      <input
        type="text"
        name="tags"
        value={tags}
        placeholder="Tags (comma separated)"
        required
        onChange={this.handleChange('tags')}
      />
      <button type="submit">{this.props.submitText}</button>
    </form>
  }
}

ComicForm.propTypes = {
}

export default ComicForm
