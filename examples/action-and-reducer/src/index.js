import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import * as reducers from './ducks';

import App from './App';
import CirclePage from './CirclePage';
import CounterPage from './CounterPage';

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware()
);

const store = createStore(combineReducers({
  ...reducers,
  routing: routerReducer
}), enhancer);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="circle" component={CirclePage} />
        <Route path="counter" component={CounterPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
