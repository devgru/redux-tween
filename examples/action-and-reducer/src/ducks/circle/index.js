import {tweenReducer} from 'redux-tween';

const MOVE = 'redux-tween-examples/circle/MOVE';

export default tweenReducer((state = {x: 10, y: 200}, action) => {
  switch (action.type) {
    case MOVE:
      const {circle} = action;
      return {...state, ...circle};
    default:
      return state;
  }
});

function moveCircleToLeft() {
  return {
    type: MOVE,
    circle: {x: 10, y: 200}
  };
}

function moveCircleToRight() {
  return {
    type: MOVE,
    circle: {x: 500, y : 200}
  };
}

export const actionCreators = {
  moveCircleToLeft,
  moveCircleToRight
};
