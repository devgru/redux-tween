import {interpolate} from 'd3-interpolate';

import {setupTween, tweenState} from './helpers/tween-storage';

import {UPDATE_TWEEN_PROGRESS, SETUP_TWEEN_TARGET} from './actions';

export default reducer => (state, action) => {
  const {type, id, progress, originalAction} = action;
  switch (type) {
    case SETUP_TWEEN_TARGET: {
      const fromState = state;
      const toState = reducer(state, originalAction);
      setupTween(id, interpolate(fromState, toState));
      return state;
    }
    case UPDATE_TWEEN_PROGRESS: {
      const state = tweenState(id, progress);
      return {...state};
    }
    default:
      return reducer(state, action);
  }
};
