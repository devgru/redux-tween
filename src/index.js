import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux'

import createLogger from 'redux-logger';

import {
  middleware as tweenMiddleware,
  higherOrderReducer as tweenReducer
} from './redux-tween';

import {svg, circle} from './ducks';

const reducers = {
  svg,
  circle: tweenReducer(circle)
};

import App from './App';
import './index.css';

const logger = createLogger();
const reducer = combineReducers(reducers);

const middleware = [/*logger, */tweenMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
