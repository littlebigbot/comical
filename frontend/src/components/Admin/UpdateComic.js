import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ComicForm from './ComicForm';
import { updateComic, getComic } from '~/actions';
import './UpdateComic.css';

class UpdateComic extends Component {
  constructor(props) {
    super(props);

    const { getComic, match } = this.props;

    getComic(match.params.slug)
  }
  componentDidUpdate(prevProps) {
    if(prevProps.match.params.slug !== this.props.match.params.slug) {
      const { getComic, match } = this.props;

      getComic(match.params.slug)
    }
  }
  handleSubmit(state) {
    console.log('BAHAHAHAHAHAHAHA')
    this.props.updateComic(state, this.props.comic.slug)
      .then(() => {
        this.props.history.push(`/admin/comics/${state.slug}`);
      })
  }
  render() {
    return <div styleName="UpdateComic">
      <h2>Update Comic</h2>
      {this.props.comic ? <ComicForm
        comic={this.props.comic}
        onSubmit={this.handleSubmit.bind(this)}
        submitText="Update"
      /> : 'Loading'}
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
