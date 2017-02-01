import React, {Component} from 'react';
import {connect} from "react-redux";

import mapActionCreators from '../util/map-action-creators';
import Circle from '../components/circle';
import {actionCreators as circleActionCreators} from '../ducks/move-circle';
import {tweenActionCreators} from "../redux-tween/index";

import {easeCubic as ease} from 'd3-ease';
const tween = {
  duration: (action) => 500,
  delay: (action) => 0,
  ease,
  getId: () => 'demo'
};

const mapStateToProps = store => {
  const {circle} = store;
  return {circle};
};
const mapDispatchToProps = mapActionCreators(tweenActionCreators(tween)({
  ...circleActionCreators
}));

const connectWithProps = connect(mapStateToProps, mapDispatchToProps);

class Demo extends Component {
  componentDidMount() {
    this.props.moveCircle(400, 0);
    
    setTimeout(() => {
      this.props.moveCircle(0, 1000);
    }, 500);
    setTimeout(() => {
      this.props.moveCircle(200, 200);
    }, 700);
  }
  
  render() {
    return <g>
      <Circle {...this.props.circle}/>
    </g>
  }
}

export default connectWithProps(Demo);