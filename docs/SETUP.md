# Defining transition setup and action filter

Redux Tween has these defaults:

- transition duration is 250ms;
- transition has no delay;
- [cubic](https://github.com/d3/d3-ease#easeCubic) easing is applied;
- every action results in transition, none of actions applies immediately.

To override this defaults you setup Redux Tween by providing additional arguments to `tweenActionCreators` or `tweenStore`.

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

// and we're good to go
const transitionSetup = {ease, duration, delay};
const actionFilter = action => !action.immediate;
```
