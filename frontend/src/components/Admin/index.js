import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import './index.css';
import NewComic from './NewComic';
import UpdateComic from './UpdateComic'
import Login from './Login';
import PublicRoute from '~/components/PublicRoute';

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    return <div styleName="Admin">
      <ul>
        <li><Link to={`${match.path}`}>Admin Home</Link></li>
        <li><Link to={`${match.path}/comics/new`}>New Comic</Link></li>
        <li><Link to={`${match.path}/comics`}>Bulk Edit</Link></li>
      </ul>

      <PublicRoute path={`${match.path}/login`} component={Login} />
      <Switch>
        <Route path={`${match.path}/comics/new`} component={NewComic} />
        {/*<Route exact path={`${match.path}/comics`} component={Comics} />*/}
        <Route path={`${match.path}/comics/:slug`} component={UpdateComic} />
      </Switch>
    </div>
  }
}

Admin.propTypes = {
}

Admin = connect(state => state, {
})(Admin)

export default Admin
