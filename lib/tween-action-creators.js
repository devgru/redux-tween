import mapObject from 'object-map';

import {bindActionCreators} from 'redux';
import * as innerActionCreators from './tween-reducer';

export default (
  actionCreators = {},
  transitionSetup = {},
  actionFilter = Boolean
) => {
  return dispatch => {
    const {setupNewTween, storeState} = bindActionCreators(innerActionCreators, dispatch);
    const wrapActionCreator = actionCreator => (...args) => {
      const originalAction = actionCreator(...args);
      
      if (!actionFilter(originalAction)) {
        dispatch(originalAction);
        return;
      }
  
      setupNewTween(originalAction, transitionSetup, storeState);
    };
    return mapObject(actionCreators, wrapActionCreator);
  }
};
