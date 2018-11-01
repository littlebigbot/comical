import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import LightIcons from "@fortawesome/fontawesome-pro-light";
import PropTypes from 'prop-types';
import './ComicNavigation.css';

class ComicNavigation extends Component {
  constructor(props) {
    super(props);
    this.openShareModal.bind(this)
  }
  openShareModal() {

  }
  render() {
    const { previousId, nextId } = this.props;
    return <nav styleName="ComicNavigation">
      <ul>
        <li>
          <Link to="/comic/first">
            <FontAwesomeIcon icon={LightIcons.faBackward} />
            First
          </Link>
        </li>
        <li>
          <Link to={`/comic/${previousId}`}>
            <FontAwesomeIcon icon={LightIcons.faStepBackward} />
            Previous
          </Link>
        </li>
        <li>
          <Link to="/comic/random">
            <FontAwesomeIcon icon={LightIcons.faRandom} />
            Random
          </Link>
        </li>
        <li>
          <a onClick={this.openShareModal.bind(this)}>
            <FontAwesomeIcon icon={LightIcons.faShare} />
            Share
          </a>
        </li>
        <li>
          <Link to={`/comic/${nextId}`}>
            <FontAwesomeIcon icon={LightIcons.faStepForward} />
            Next
          </Link>
        </li>
        <li>
          <Link to="/comic/last">
            <FontAwesomeIcon icon={LightIcons.faForward} />
            Last
          </Link>
        </li>
      </ul>
    </nav>
  }
}

ComicNavigation.propTypes = {
  previousId: PropTypes.string.isRequired,
  currentId: PropTypes.string.isRequired,
  nextId: PropTypes.string.isRequired
}

ComicNavigation = connect(state => state, {
})(ComicNavigation)

export default ComicNavigation
