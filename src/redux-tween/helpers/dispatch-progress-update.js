import {UPDATE_TWEEN_PROGRESS} from '../actions';

export default ({dispatch}) => id => progress => {
  dispatch({
    type: UPDATE_TWEEN_PROGRESS,
    id,
    progress
  });
};
