import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import 'normalize.css/normalize.css'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router';
import Comic from './Comic';
import About from './About';
import Archive from './Archive';
import Header from './Header';

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
              <Route exact path={['/comic/:id', '/']} component={Comic} />
              <Route exact path="/archive" component={Archive} />
              <Route exact path="/about" component={About} />
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
