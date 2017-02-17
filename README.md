# Redux Tween

> Tween between reducer states.
> Library is under development.

Redux Tween provides a way to change state in your Redux store smoothly, interpolating states in between.

To achieve it Redux Tween wraps action creators and a reducer (i.e. whole [duck](https://github.com/erikras/ducks-modular-redux)).

## How it works

Redux Tween uses [d3-transition](https://github.com/d3/d3-transition) to start and interrupt transitions. Redux Tween allows running one transition per reducer, interrupting previous transition if necessary.

[d3-transition](https://github.com/d3/d3-transition) utilizes [d3-timer](https://github.com/d3/d3-timer) which uses requestAnimationFrame or standard browser setTimeout. This approach gives as many FPS as possible

Under the hood, Redux Tween uses wrapped reducer to calculate target state but instead of immediately applying it, applies states interpolated from current to target state with [d3-interpolate](https://github.com/d3/d3-interpolate).

[d3-interpolate](https://github.com/d3/d3-interpolate) allows  interpolating between numbers, strings, colors, dates. Most importantly, it supports objects and arrays so you can interpolate custom nested data structures.

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
- every action results in transition, no actions are applied immediately.

To override this defaults, you can setup Redux Tween.

```js
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
// const duration = 750;
// const delay = 50;

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

const mapStateToProps = ...; // up to you

const mapDispatchToProps = tweenActionCreators(actionCreators, transitionSetup, actionFilter);

const connectWithProps = connect(mapStateToProps, mapDispatchToProps);
```

Pass *mapDispatchToProps* as a second argument of react-redux's [connect()](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

### Wrapping reducer

```js
import {default as someReducer} from '../ducks/your-duck';
import {tweenReducer} from 'redux-tween';

const someTweenedReducer = tweenReducer(someReducer);
```

After wrapping, combine your reducer as usual.
You can also try wrapping combined reducer right before passing it to the store but this approach is not tested and can impact store performance.

## API Reference

Is [here](./API.md).

## TODO

- More tests;
- More examples;
- Queueing support;
- Rewrite in TS.

## Development

* Run tests: `yarn test`;
* Build `yarn build`;

## License

MIT © [Dmitriy Semyushkin](https://devg.ru)
