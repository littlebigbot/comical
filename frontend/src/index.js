import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import Root from './components/Root'
import ReactGA from 'react-ga';
import rootReducer from './reducers'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import googleAnalytics from './middleware/google-analytics';
import persist from './middleware/persist';
import './index.css';
import './assets/favicon.ico'

if(process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-3209890-1');
}

const logger = createLogger();
const history = createHistory();
const historyMiddleware = routerMiddleware(history);


const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(logger),
    applyMiddleware(thunk),
    applyMiddleware(persist),
    applyMiddleware(historyMiddleware),
    applyMiddleware(googleAnalytics)
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
