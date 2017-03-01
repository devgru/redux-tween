import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Circle from './Circle';
import {actionCreators as circleActionCreators} from '../ducks/circle';

const mapStateToProps = store => {
  const {circle} = store;
  return {circle};
};
const mapDispatchToProps = dispatch => bindActionCreators(circleActionCreators, dispatch);

const connectWithProps = connect(mapStateToProps, mapDispatchToProps);

class Demo extends Component {
  componentDidMount() {
    this.direction = 'left';
    const moveCircle = () => {
      if (this.direction === 'left') {
        this.props.moveCircleToLeft();
        this.direction = 'right';
      } else {
        this.props.moveCircleToRight();
        this.direction = 'left';
      }
    };
    moveCircle();
    this.interval = setInterval(moveCircle, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return <g>
      <Circle {...this.props.circle}/>
    </g>
  }
}

export default connectWithProps(Demo);
