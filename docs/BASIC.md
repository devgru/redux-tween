# Basic integration

To use Redux Tween follow these steps:

1. Enhance store.
2. (Optional) Define transition setup and action filter.

## Enhancing store

```js
import {createStore, applyMiddleware, compose} from 'redux';
import {tweenStore} from 'redux-tween';

const enhancer = compose(
  applyMiddleware(...middlewares),
  tweenStore()
);

const store = createStore(reducer, enhancer);
```

## Defining transition setup and action filter

Define transitionSetup and/or actionFilter as described [here](./SETUP.md) and use them:

```js
// pass your setup like this:
const enhancer = compose(
  applyMiddleware(...middlewares),
  tweenStore(transitionSetup, actionFilter)
);

// if you want just setup:
const enhancer = compose(
  applyMiddleware(...middlewares),
  tweenStore(transitionSetup, actionFilter)
);

// if you want just filter:
const enhancer = compose(
  applyMiddleware(...middlewares),
  tweenStore({}, actionFilter)
);
```
