import {SET_TWEEN_STATE} from './actions';

export default ({dispatch}) => (time, id) => {
  dispatch({
    type: SET_TWEEN_STATE,
    time,
    id
  });
};