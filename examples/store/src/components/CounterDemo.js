import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Counter from './Counter';
import {actionCreators as counterActionCreators} from '../ducks/counter';

const mapStateToProps = store => {
  const {counter} = store;
  return {count: counter};
};
const mapDispatchToProps = dispatch => bindActionCreators(counterActionCreators, dispatch);

const connectWithProps = connect(mapStateToProps, mapDispatchToProps);

export default connectWithProps(Counter);
