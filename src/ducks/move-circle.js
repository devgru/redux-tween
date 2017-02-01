const MOVE = 'test-react-motion/move-circle/MOVE';

export default function reducer(state = {x: 0}, action) {
  switch (action.type) {
    case MOVE:
      const {circle} = action;
      return {...state, ...circle};
    default:
      return state;
  }
};

function moveCircle(x) {
  return {
    type: MOVE,
    circle: {x}
  };
}

export const actionCreators = {
  moveCircle
};
