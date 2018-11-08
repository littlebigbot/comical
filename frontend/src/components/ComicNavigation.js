import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/pro-light-svg-icons';
import PropTypes from 'prop-types';
import './ComicNavigation.css';
import { isNull } from 'lodash';

class ComicNavigation extends Component {
  render() {
    const { firstSlug, previousSlug, nextSlug, lastSlug, randomSlug, currentSlug } = this.props;
    return <nav styleName="ComicNavigation">
      <ul>
        <li>
          <Link title="First" disabled={firstSlug === currentSlug} to={`/comic/${firstSlug}`}>
            <FontAwesomeIcon size="2x" icon={Icons.faBackward} />
            <span>First</span>
          </Link>
        </li>
        <li>
          <Link title="Previous" disabled={isNull(previousSlug)} to={`/comic/${previousSlug}`}>
            <FontAwesomeIcon size="2x" icon={Icons.faStepBackward} />
            <span>Previous</span>
          </Link>
        </li>
        <li>
          <Link title="Random" disabled={isNull(randomSlug)} to={`/comic/${randomSlug}`}>
            <FontAwesomeIcon size="2x" icon={Icons.faRandom} />
            <span>Random</span>
          </Link>
        </li>
        {/*<li>
          <a title="Share" onClick={this.openShareModal}>
            <FontAwesomeIcon size="2x" icon={Icons.faShareAlt} />
            <span>Share</span>
          </a>
        </li>*/}
        <li>
          <Link title="Next" disabled={isNull(nextSlug)} to={`/comic/${nextSlug}`}>
            <FontAwesomeIcon size="2x" icon={Icons.faStepForward} />
            <span>Next</span>
          </Link>
        </li>
        <li>
          <Link title="Last" disabled={lastSlug === currentSlug} to={`/comic/${lastSlug}`}>
            <FontAwesomeIcon size="2x" icon={Icons.faForward} />
            <span>Last</span>
          </Link>
        </li>
      </ul>
    </nav>
  }
}

ComicNavigation.propTypes = {
  previousSlug: PropTypes.string,
  currentSlug: PropTypes.string.isRequired,
  nextSlug: PropTypes.string,
  firstSlug: PropTypes.string.isRequired,
  lastSlug: PropTypes.string.isRequired,
  randomSlug: PropTypes.string.isRequired
}

export default ComicNavigation
