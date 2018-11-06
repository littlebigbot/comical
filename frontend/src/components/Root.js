import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import 'normalize.css/normalize.css'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router';
import Comic from './Comic';
import About from './About';
import Archive from './Archive';
import AdminComic from './AdminComic';
import Login from './Login';
import Err from './Err';
import Header from './Header';
import PrivateRoute from './PrivateRoute';
console.log(PrivateRoute)
import styles from './Root.css';

class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header/>
            <div styleName="styles.container">
              <Switch>
                <Route exact path={['/comic/:slug', '/']} component={Comic} />
                <Route exact path="/archive" component={Archive} />
                <Route exact path="/about" component={About} />
                <Route path="/admin/login" component={Login} />
                <PrivateRoute path="/admin/comic/new" component={AdminComic} />
                <Route component={Err} />
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

// export default Root
export default hot(module)(Root)
