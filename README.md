# Redux Tween

> Tween store state.

> Library is in pre-release.

<img src="https://raw.githubusercontent.com/devgru/redux-tween/master/counter.gif" alt="Counter Demo" width="120">

Redux Tween provides a way to change state in Redux store smoothly, interpolating states in between.

To achieve it Redux Tween wraps action creators and a reducer (i.e. whole [duck](https://github.com/erikras/ducks-modular-redux)).

## How it works

Redux Tween uses wrapped reducer to calculate next state. Instead of immediately applying new state, Redux Tween launches timer which pushes new interpolated states on every frame.

Redux Tween uses [d3-transition](https://github.com/d3/d3-transition) to start and interrupt transitions. Redux Tween allows running one transition per reducer, interrupting previous transition if necessary.

Redux Tween uses [d3-interpolate](https://github.com/d3/d3-interpolate) which allows interpolating between numbers, strings, colors, dates. Most importantly, it supports objects and arrays interpolation so you can interpolate custom nested data structures (even the store itself).

## Installing

```sh
$ yarn add redux-tween
# or
$ npm install --save redux-tween
```

## Usage

To use Redux Tween follow these steps:

1. Wrap action creators object.
2. Wrap reducer.
3. (Optional) Define transition setup and action filter.

### Wrapping action creators

Wrapping replaces [bindActionCreators](http://redux.js.org/docs/api/bindActionCreators.html) call:

```js
import * as actionCreators from '../ducks/your-duck';
import {tweenActionCreators} from 'redux-tween';

const mapDispatchToProps = tweenActionCreators(actionCreators);

// or, if you need to add more dispatchables
const tweened = tweenActionCreators(actionCreators);
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

You should wrap reducers responsible for handling tweened actions.

```js
import {default as someReducer} from '../ducks/your-duck';
import {tweenReducer} from 'redux-tween';

const someTweenedReducer = tweenReducer(someReducer);
```

After wrapping, combine wrapped reducer as usual.
You can wrap basic or combined reducer in any level of hierarchy. It is recommended to check whether tweening impacts your app performance.

### Defining transition setup and action filter

Redux Tween has these defaults:

- transition duration is 250ms;
- transition has no delay;
- [cubic](https://github.com/d3/d3-ease#easeCubic) easing is applied;
- every action results in transition, none of actions applies immediately.

To override this defaults you setup Redux Tween by providing additional arguments to `tweenActionCreators`.

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

// if you want just filter:
const mapDispatchToProps = tweenActionCreators(actionCreators, {}, actionFilter);
```

## API Reference

Is [here](./API.md).

## Running examples

```sh
$ cd examples
$ yarn
$ yarn start
```

## TODO

- Introduce store tweening as most simple possible integration;
- Add benchmarks;
- More tests;
- More examples;
- Check for corner cases;
- Rewrite in TS.

## Development

Your input is highly appreciated.

This library is experimental and I'd be happy to help you integrating Redux Tween into other software.

To play with library, follow these steps:

* Install dependencies: `yarn`;
* Develop;
* Run tests: `yarn test -- --watchAll`;
* Build `yarn build`;

## License

MIT © [Dmitriy Semyushkin](https://devg.ru)
