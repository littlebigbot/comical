import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import storage from 'store';
import { has } from 'lodash';
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import Root from './components/Root'
import rootReducer from './reducers'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import './index.css';
import './assets/favicon.ico'

const logger = createLogger();
const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const persist = store => next => action => {
  if(has(action, 'payload.response.token')) {
    storage.set('jwt', action.payload.response.token)
  }
  return next(action)
}

const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(logger),
    applyMiddleware(thunk),
    applyMiddleware(persist),
    applyMiddleware(historyMiddleware),
  )
);

window.store = store;

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
