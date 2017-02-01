import tween from './d3-tween';

import tick from './tick';
import {STORE_TWEEN_TARGET} from './actions';

const defaultTweenConfig = {
  duration: 1000,
  delay: 0
};

export default store => next => action => {
  const {tweenConfig} = action;
  if (!tweenConfig) {
    next(action);
    return
  }
  
  const dispatchTweenState = tick(store);
  
  const id = tweenConfig.id;
  next({
    type: STORE_TWEEN_TARGET,
    action,
    id
  });
  
  tween(
    id,
    {...defaultTweenConfig, ...tweenConfig},
    dispatchTweenState
  );
  
};