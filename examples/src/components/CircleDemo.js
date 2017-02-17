import React, {Component} from 'react';
import {connect} from 'react-redux';

import Circle from './Circle';
import {actionCreators as circleActionCreators} from '../ducks/circle';
import {tweenActionCreators} from 'redux-tween';

import {easePolyIn as ease} from 'd3-ease';
const tweenConfig = {
  duration: 400,
  ease
};

const mapStateToProps = store => {
  const {circle} = store;
  return {circle};
};
const mapDispatchToProps = tweenActionCreators(circleActionCreators, tweenConfig);

const connectWithProps = connect(mapStateToProps, mapDispatchToProps);

class Demo extends Component {
  componentDidMount() {
    this.direction = 'left';
    this.interval = setInterval(() => {
      if (this.direction === 'left') {
        this.props.moveCircleToLeft();
        this.direction = 'right';
      } else {
        this.props.moveCircleToRight();
        this.direction = 'left';
      }
    }, 1000);
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
