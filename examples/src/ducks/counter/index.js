import {tweenReducer} from 'redux-tween';

const INCREMENT = 'redux-tween-examples/counter/INCREMENT';
const DECREMENT = 'redux-tween-examples/counter/DECREMENT';

export default tweenReducer((state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
});

function increment() {
  return {type: INCREMENT};
}

function decrement() {
  return {type: DECREMENT};
}

export const actionCreators = {
  increment,
  decrement
};
