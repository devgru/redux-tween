import objectAssign from 'object-assign';

import {configureTransition} from './helpers/transitionist';

const STATE_STORED = 'redux-tween/STATE_STORED';
const GLOBAL_REDUCER = 'global';

export default (transitionSetup = {}, actionFilter = Boolean) =>
  createStore => (reducer, preloadedState, enhancer) => {
      function _reducer(state, action) {
        const {type, interpolatedState} = action;
        if (type === STATE_STORED) {
          return interpolatedState;
        } else {
          return reducer(state, action);
        }
      }
      
      const store = createStore(_reducer, preloadedState, enhancer);
      const _dispatch = store.dispatch;
      
      function storeState(reducerId, interpolatedState, p) {
        if (reducerId === GLOBAL_REDUCER) {
          _dispatch({type: STATE_STORED, interpolatedState});
        }
      }
      
      function tweenDispatch(originalAction) {
        if (actionFilter(originalAction)) {
          const action = {originalAction, transitionSetup, storeState};
          configureTransition(GLOBAL_REDUCER, reducer, store.getState(), action)
        } else {
          _dispatch(originalAction);
        }
      }
      
      return objectAssign({}, store, {
        dispatch: tweenDispatch
      });
    }
