import {configureTransition} from './helpers/transitionist';

const NEW_TWEEN_SETUP = 'redux-tween/NEW_TWEEN_SETUP';
const STATE_STORED = 'redux-tween/STATE_STORED';

export const setupNewTween = (originalAction, transitionSetup, storeState) => ({
  type: NEW_TWEEN_SETUP,
  originalAction,
  transitionSetup,
  storeState
});

export const storeState = (reducerId, interpolatedState) => ({
  type: STATE_STORED,
  reducerId,
  interpolatedState
});

let nextId = 0;

export default reducer => {
  const reducerId = nextId++;
  return (state, action) => {
    switch (action.type) {
      case NEW_TWEEN_SETUP:
        configureTransition(reducerId, reducer, state, action);
        return state;
      case STATE_STORED:
        if (reducerId === action.reducerId) {
          return action.interpolatedState;
        } else {
          return state;
        }
      default:
        return reducer(state, action);
    }
  };
}
