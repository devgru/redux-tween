# Redux Tween

> Tween store state.
> Library is in pre-release.

<img src="https://raw.githubusercontent.com/devgru/redux-tween/master/counter.gif" alt="Counter Demo" width="120">

Redux Tween provides a way to tween state in Redux store smoothly, interpolating states in between.

To achieve it Redux Tween wraps action creators and a reducer (i.e. whole [duck](https://github.com/erikras/ducks-modular-redux)).

## How it works

Redux Tween uses your reducer to calculate next store state but instead of immediately applying it, applies states interpolated from current to next state with [d3-interpolate](https://github.com/d3/d3-interpolate).

Redux Tween uses [d3-transition](https://github.com/d3/d3-transition) to start and interrupt transitions. Redux Tween allows running one transition per reducer, interrupting previous transition if necessary.

[d3-interpolate](https://github.com/d3/d3-interpolate) allows interpolating between numbers, strings, colors, dates. Most importantly, it supports objects and arrays interpolation so you can interpolate custom nested data structures.

## Installing

```sh
$ yarn add redux-tween
# or
$ npm install --save redux-tween
```

## Usage

To use Redux Tween follow these steps:

1. (Optional) Define transition setup and action filter.
2. Wrap your action creators object.
3. Wrap your reducer.

### Defining transition setup and action filter

Redux Tween has four defaults:

- transition duration is 250ms;
- transition has no delay by default;
- [cubic](https://github.com/d3/d3-ease#easeCubic) easing is applied;
- every action results in transition, none of actions applies immediately.

To override this defaults you setup Redux Tween.

```js

// use one of d3 easings or write your own
import {easePolyIn as ease} from 'd3-ease';

const duration = ({action, state, nextState}) => {
  // calculate duration
  return action.desiredDuration;
};

const delay = ({action, state, nextState}) => {
  // calculate delay
  return action.desiredDelay;
};

// or just 
const duration = 750;
const delay = 50;

const transitionSetup = {ease, duration, delay};
const actionFilter = action => !action.immediate;

// pass your setup like this:
const mapDispatchToProps = tweenActionCreators(actionCreators, transitionSetup, actionFilter);

// you're OK with defaults, call it without setup:
const mapDispatchToProps = tweenActionCreators(actionCreators);

// if you want just filter:
const mapDispatchToProps = tweenActionCreators(actionCreators, {}, actionFilter);
```

### Wrapping action creators

Wrapping replaces [bindActionCreators](http://redux.js.org/docs/api/bindActionCreators.html) call:

```js
import * as actionCreators from '../ducks/your-duck';
import {tweenActionCreators} from 'redux-tween';

const mapDispatchToProps = tweenActionCreators(actionCreators, transitionSetup, actionFilter);

// or, if you need to add more dispatchables
const tweened = tweenActionCreators(actionCreators, transitionSetup, actionFilter);
const mapDispatchToProps = dispatch => {
  const anotherDispatchable = ...
  return {
    ...tweened,
    anotherDispatchable
  };
}
```

Pass *mapDispatchToProps* as a second argument of react-redux's [connect()](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

```js
const mapStateToProps = ... // up to you
const connectWithProps = connect(mapStateToProps, mapDispatchToProps);
```

### Wrapping reducer

```js
import {default as someReducer} from '../ducks/your-duck';
import {tweenReducer} from 'redux-tween';

const someTweenedReducer = tweenReducer(someReducer);
```

After wrapping, combine your reducer as usual.
You can wrap basic or combined reducer in any level of your hierarchy but this approach can impact store performance.

## API Reference

Is [here](./API.md).

## TODO

- More tests;
- More examples;
- Check for corner cases;
- Rewrite in TS.

## Development

* Run tests: `yarn test`;
* Build `yarn build`;

## License

MIT © [Dmitriy Semyushkin](https://devg.ru)
