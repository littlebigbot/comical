import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ComicForm from './ComicForm'
import { createComic } from '~/actions';
import './NewComic.css';

class NewComic extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(state) {
    
    this.props.createComic(state)
      .then(() => {
        this.props.history.push('/admin/comics/');
      })
  }
  render() {
    return <div styleName="NewComic">
      <ComicForm
        onSubmit={this.handleSubmit}
        submitText="Create"
      />
    </div>
  }
}

NewComic.propTypes = {
}

NewComic = connect(state => state, {
  createComic
})(NewComic)

export default NewComic
