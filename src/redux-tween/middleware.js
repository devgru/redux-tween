import dispatchProgressUpdate from './helpers/dispatch-progress-update';
import doNotTween from './helpers/do-not-tween';
import getTweenId from './helpers/get-tween-id';
import mergeConfig from './helpers/merge-config';
import selectRoot from './helpers/select-root';
import startTransition from './helpers/start-transition';

import {SETUP_TWEEN_TARGET} from './actions';

export default store => next => action => {
  if (doNotTween(action)) {
    next(action);
    return
  }
  
  const tweenConfig = mergeConfig(action);
  const id = getTweenId(tweenConfig, action);
  const updateTweenProgress = dispatchProgressUpdate(store)(id);
  const selection = selectRoot(id).datum(action);
  startTransition(selection, id, tweenConfig, updateTweenProgress);
  
  next({
    type: SETUP_TWEEN_TARGET,
    id,
    originalAction: action
  });
};
