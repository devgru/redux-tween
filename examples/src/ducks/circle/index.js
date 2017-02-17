import {tweenReducer} from 'redux-tween';

const MOVE = 'redux-tween-examples/circle/MOVE';

export default tweenReducer((state = {}, action) => {
  switch (action.type) {
    case MOVE:
      const {circle} = action;
      return {...state, ...circle};
    default:
      return state;
  }
});

function moveCircle(x, y) {
  return {
    type: MOVE,
    circle: {x, y}
  };
}

function moveCircleToLeft() {
  return {
    type: MOVE,
    circle: {x: 0, y: 200}
  };
}

function moveCircleToRight() {
  return {
    type: MOVE,
    circle: {x: 500, y : 200}
  };
}

export const actionCreators = {
  moveCircle,
  moveCircleToLeft,
  moveCircleToRight
};
