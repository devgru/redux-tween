import {select} from 'd3-selection';
import {interrupt} from 'd3-transition';
import {interpolate} from 'd3-interpolate';
import cloneDeep from 'lodash.clonedeep';

import setupUtility from './setup-utility';

const TRANSITION_NAME = 'TRANSITION_BY_REDUX_TWEEN';
const STORAGE = {};

export const configureTransition = (reducerId, reducer, state, action) => {
  const prevState = state;
  const {originalAction, transitionSetup, storeState} = action;
  
  if (STORAGE[reducerId]) {
    interrupt(STORAGE[reducerId], TRANSITION_NAME);
    state = STORAGE[reducerId].tween(1);
  }
  
  const nextState = reducer(state, originalAction);
  const datum = {state: prevState, nextState, action: originalAction};
  
  const tween = interpolate(prevState, nextState);
  const storage = STORAGE[reducerId] = {tween};
  
  select(storage)
    .datum(datum)
    .transition(TRANSITION_NAME)
    .call(setupUtility, transitionSetup)
    .tween('', () => progress => {
      storeState(reducerId, cloneDeep(tween(progress)));
      if(progress === 1) {
        delete STORAGE[reducerId];
      }
    });
};
