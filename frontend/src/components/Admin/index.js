import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import storage from 'store';
import { Route, Switch, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import './index.css';
import NewComic from './NewComic';
import UpdateComic from './UpdateComic'
import Comics from './Comics'
import Login from './Login';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  logout() {
    storage.remove('jwt');
    this.props.history.push('/');
  }
  render() {
    const { match } = this.props;
    return <div styleName="Admin">
      <ul>
        <li><Link to={`${match.path}/comics/new`}>New Comic</Link></li>
        <li><Link to={`${match.path}/comics`}>Comics</Link></li>
        <li><a onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>

      <Switch>
        <PublicRoute path={`${match.path}/login`} component={Login} />
        <PrivateRoute path={`${match.path}/comics/new`} component={NewComic} />
        <PrivateRoute exact path={`${match.path}/comics`} component={Comics} />
        <PrivateRoute path={`${match.path}/comics/:slug`} component={UpdateComic} />
        <Redirect from="/" to={`${match.path}/comics`} />
      </Switch>
    </div>
  }
}

Admin.propTypes = {
}

Admin = connect(state => state, {
})(Admin)

export default Admin
