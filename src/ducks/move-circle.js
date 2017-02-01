const MOVE = 'test-react-motion/move-circle/MOVE';

export default function reducer(state = {x: 0, y: 0}, action) {
  switch (action.type) {
    case MOVE:
      const {circle} = action;
      return {...state, ...circle};
    default:
      return state;
  }
};

function moveCircle(x, y) {
  return {
    type: MOVE,
    circle: {x, y}
  };
}

export const actionCreators = {
  moveCircle
};
