# Advanced integration

To use Redux Tween:

1. Wrap action creators object.
2. Wrap reducer.
3. (Optional) Define transition setup and action filter.

## Wrapping action creators

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

## Wrapping reducer

Wrap reducers responsible for handling tweened actions.

```js
import {default as someReducer} from '../ducks/your-duck';
import {tweenReducer} from 'redux-tween';

const someTweenedReducer = tweenReducer(someReducer);
```

After wrapping, combine wrapped reducer as usual.
You can wrap basic or combined reducer in any level of hierarchy. It is recommended to check whether tweening impacts your app performance.

## Defining transition setup and action filter

Define *transitionSetup* and/or *actionFilter* as described [here](./SETUP.md) and use them:

```js
// pass your setup like this:
const mapDispatchToProps = tweenActionCreators(actionCreators, transitionSetup, actionFilter);

// if you want just setup:
const mapDispatchToProps = tweenActionCreators(actionCreators, transitionSetup);

// if you want just filter:
const mapDispatchToProps = tweenActionCreators(actionCreators, {}, actionFilter);
```
