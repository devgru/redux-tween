import {interpolate} from 'd3-interpolate';

import {SET_TWEEN_STATE, STORE_TWEEN_TARGET} from './actions';

const tweens = {};

export default reducer => (state, action) => {
  const {type, id, time} = action;
  switch (type) {
    case STORE_TWEEN_TARGET: {
      const fromState = state;
      const toState = reducer(state, action.action);
      tweens[id] = interpolate(fromState, toState);
      return state;
    }
    case SET_TWEEN_STATE: {
      const state = tweens[id](time);
      if (time === 1) delete tweens[id];
      return {...state};
    }
    default:
      return reducer(state, action);
  }
};
