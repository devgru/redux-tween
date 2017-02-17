# Redux Tween API Reference

Redux Tween API provides two functions, *tweenReducer* and *tweenActionCreators*.

## tweenReducer(*reducer*)

Wraps your reducer to apply tweened states.

### Arguments

1. **reducer** is an ordinary reducer.

### Returns
 
Returns similar reducer which is enhanced to deal with both your actions and Redux Tween inner actions. This reducer would properly deal with all your actions, tweened or intermediate.

## tweenActionCreators(*actionCreators = {}*, *transitionSetup = {}*, *actionFilter = Boolean*)

Given an action creators dictionary *actionCreators*, setup object *transitionSetup* and a filtering function *actionFilter* returns a *readyToDispatch* function.

All arguments are optional, but without *actionCreators* the result would be useless.

### Arguments

1. **actionCreators** is an ordinary action creators dictionary i.e. an object which values are functions, returning Redux action.

2. **transitionSetup** is an object with three optional keys:
  - **ease** to specify easing function (pass any one from [d3-ease](https://github.com/d3/d3-ease));
  - **duration** to specify transition duration in milliseconds;
  - **delay** to specify transition delay in milliseconds.

  *duration* and *delay* values can be numeric or a *calculate* function.

  **calculate**({*action*, *state*, *nextState*})

  Given an object with *action*, *state* and *nextState* returns a numeric *value* representing transition parameter, *duration* or *delay*.
  
  This approach allows you to implement constant speed transitions, calculating desired duration based on state difference.
  
3. **actionFilter**(*action) is a function. Given original action, created by one of your action creators, returns true or false. True result enabled tweening for this action, false stands for immediate state application. If no *actionFilter* is provided, every action will be tweened.

### Returns

Returns *readyToDispatch(dispatch)* function which, given a *dispatch* function, returns *wrappedActionCreators* — function dictionary, wrapping *actionCreators* structure the same way as [bindActionCreators](http://redux.js.org/docs/api/bindActionCreators.html) does.

Call this function manually within *mapDispatchToProps* binder or just pass it as a second argument of react-redux's [connect()](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

With Redux Tween you don't call [bindActionCreators](http://redux.js.org/docs/api/bindActionCreators.html) manually.
