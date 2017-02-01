import React, {Component} from 'react';
import {connect} from "react-redux";
import {range} from 'd3-array';

import mapActionCreators from '../util/map-action-creators';
import Circle from '../components/circle';
import {actionCreators as circleActionCreators} from '../ducks/move-circle';
import {tweenActionCreators} from "../redux-tween/index";

import {easeLinear as ease} from 'd3-ease';
const tween = {
  duration: 3000,
  ease
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
    this.props.moveCircle(400);
    
    setTimeout(() => {
      this.props.moveCircle(0);
    }, 2000);
    setTimeout(() => {
      this.props.moveCircle(200);
    }, 3000);
  }
  
  render() {
    return <g>
      {range(0, 10).map(r =>
        <Circle x={this.props.circle.x} y={r * 10} key={r}/>
      )}
    </g>
  }
}

export default connectWithProps(Demo);