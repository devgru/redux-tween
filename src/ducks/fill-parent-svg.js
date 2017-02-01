const RESIZE = 'test-react-motion/fill-parent-svg/RESIZE';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case RESIZE:
      return {...state, ...action.size};
    default:
      return state;
  }
};

function setSvgSize(size) {
  return {
    type: RESIZE,
    size
  };
}

export const actionCreators = {
  setSvgSize
};