import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import LightIcons from '@fortawesome/fontawesome-pro-light';
import PropTypes from 'prop-types';
import './ComicNavigation.css';
import { isNull } from 'lodash';

class ComicNavigation extends Component {
  constructor(props) {
    super(props);
    this.openShareModal.bind(this)
  }
  openShareModal() {

  }
  render() {
    const { firstSlug, previousSlug, nextSlug, lastSlug, randomSlug, currentSlug } = this.props;
    return <nav styleName="ComicNavigation">
      <ul>
        <li>
          <Link disabled={firstSlug === currentSlug} to={`/comic/${firstSlug}`}>
            <FontAwesomeIcon icon={LightIcons.faBackward} />
            <span>First</span>
          </Link>
        </li>
        <li>
          <Link disabled={isNull(previousSlug)} to={`/comic/${previousSlug}`}>
            <FontAwesomeIcon icon={LightIcons.faStepBackward} />
            <span>Previous</span>
          </Link>
        </li>
        <li>
          <Link to={`/comic/${randomSlug}`}>
            <FontAwesomeIcon icon={LightIcons.faRandom} />
            <span>Random</span>
          </Link>
        </li>
        <li>
          <a onClick={this.openShareModal.bind(this)}>
            <FontAwesomeIcon icon={LightIcons.faShare} />
            <span>Share</span>
          </a>
        </li>
        <li>
          <Link disabled={isNull(nextSlug)} to={`/comic/${nextSlug}`}>
            <FontAwesomeIcon icon={LightIcons.faStepForward} />
            <span>Next</span>
          </Link>
        </li>
        <li>
          <Link disabled={lastSlug === currentSlug} to={`/comic/${lastSlug}`}>
            <FontAwesomeIcon icon={LightIcons.faForward} />
            <span>Last</span>
          </Link>
        </li>
      </ul>
    </nav>
  }
}

ComicNavigation.propTypes = {
  previousSlug: PropTypes.string.isRequired,
  currentSlug: PropTypes.string.isRequired,
  nextSlug: PropTypes.string.isRequired,
  firstSlug: PropTypes.string.isRequired,
  lastSlug: PropTypes.string.isRequired,
  randomSlug: PropTypes.string.isRequired
}

ComicNavigation = connect(state => state, {
})(ComicNavigation)

export default ComicNavigation
