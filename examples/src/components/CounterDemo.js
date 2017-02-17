import {connect} from 'react-redux';

import Counter from './Counter';
import {actionCreators as counterActionCreators} from '../ducks/counter';
import {tweenActionCreators} from 'redux-tween';

import {easeExpOut as ease} from 'd3-ease';
const tweenConfig = {
  duration: 5000,
  ease
};

const mapStateToProps = store => {
  const {counter} = store;
  return {count: counter};
};
const mapDispatchToProps = tweenActionCreators(counterActionCreators, tweenConfig);

const connectWithProps = connect(mapStateToProps, mapDispatchToProps);

export default connectWithProps(Counter);
