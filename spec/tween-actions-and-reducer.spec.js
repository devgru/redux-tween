import React from 'react';
import {connect, Provider} from 'react-redux';
import {createStore} from 'redux';
import renderer from 'react-test-renderer';
import {easeCubicIn} from 'd3-ease';
import roundTo from 'round-to-precision';

const roundToQuarter = roundTo(25);

import {tweenActionCreators, tweenReducer} from '../lib';

const reducer = (state = 0, action) => {
  const {type, percent} = action;
  switch (type) {
    case 'SET_PERCENTAGE':
      return percent;
    case 'ADD_PERCENTAGE':
      return state + percent;
    default:
      return state;
  }
};

const actionCreators = {
  setPercentage: (percent) => ({type: 'SET_PERCENTAGE', percent}),
  addPercentage: (percent) => ({type: 'ADD_PERCENTAGE', percent})
};

const mapStateToProps = (percent = 0) => ({percent});

const filterImmediateActions = ({percent}) => percent !== 0;

const TweenTester = ({percent}) => (<span>{roundToQuarter(percent)}</span>);

const mapDispatchToProps = tweenActionCreators(actionCreators, {
  duration: 1000
}, filterImmediateActions);
const store = createStore(tweenReducer(reducer));
const connectWithProps = connect(mapStateToProps, mapDispatchToProps);
const ConnectedTester = connectWithProps(TweenTester);

const mapDispatchToPropsNever = tweenActionCreators(actionCreators, {}, action => false);
const connectWithPropsNever = connect(mapStateToProps, mapDispatchToPropsNever);
const ConnectedTesterNever = connectWithPropsNever(TweenTester);

const mapDispatchToPropsCubic = tweenActionCreators(actionCreators, {
  ease: easeCubicIn
}, filterImmediateActions);
const connectWithPropsCubic = connect(mapStateToProps, mapDispatchToPropsCubic);
const ConnectedTesterCubic = connectWithPropsCubic(TweenTester);

const mapDispatchToPropsConstantSpeed = tweenActionCreators(actionCreators, {
  duration: ({
    state, nextState
  }) => Math.abs(nextState - state) * 10
}, filterImmediateActions);
const connectWithPropsConstantSpeed = connect(mapStateToProps, mapDispatchToPropsConstantSpeed);
const ConnectedTesterConstantSpeed = connectWithPropsConstantSpeed(TweenTester);

const runTimer = (component, time) =>
  new Promise(resolve => {
    setTimeout(() => {
      expect(component.toJSON()).toMatchSnapshot();
      resolve(true);
    }, time);
  });

describe('redux-tween', () => {
  it('should init well', function () {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedTester />
      </Provider>
    );
    
    expect(component.toJSON()).toMatchSnapshot();
  });
  
  it('should achieve target state after tween', function () {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedTester />
      </Provider>
    );
    
    const {setPercentage} = mapDispatchToProps(store.dispatch);
    setPercentage(0);
    setPercentage(100);
  
    return runTimer(component, 1110);
  });
  
  it('should achieve target state after two sequential tweens', function () {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedTester />
      </Provider>
    );
    
    const {setPercentage, addPercentage} = mapDispatchToProps(store.dispatch);
    setPercentage(0);
    addPercentage(50);
    setTimeout(() => {
      addPercentage(50);
    }, 300);
    
    return runTimer(component, 1500);
  });
  
  it('should have nearly 50% progress in 50% of time', function () {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedTester />
      </Provider>
    );
    
    const {setPercentage} = mapDispatchToProps(store.dispatch);
    setPercentage(0);
    setPercentage(100);
  
    return runTimer(component, 500);
  });
  
  it('should behave properly when interrupted', function () {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedTester />
      </Provider>
    );
    
    const {setPercentage} = mapDispatchToProps(store.dispatch);
    setPercentage(0);
    setPercentage(100);
    setTimeout(() => {
      setPercentage(-1)
    }, 500);
    
    return runTimer(component, 1600);
  });
  
  
  it('should try to be constant speed when required', function () {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedTesterConstantSpeed />
      </Provider>
    );
    
    const {setPercentage} = mapDispatchToPropsConstantSpeed(store.dispatch);
    setPercentage(0);
    setPercentage(100);
    setTimeout(() => {
      setPercentage(-1)
    }, 500);
    
    return runTimer(component, 1000);
  });
  
  it('should have nearly 25% progress in 15% of time with cubic', function () {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedTesterCubic />
      </Provider>
    );
    
    const {setPercentage} = mapDispatchToPropsCubic(store.dispatch);
    setPercentage(0);
    setPercentage(100);
    
    return runTimer(component, 150);
  });
  
  
  it('should not tween, apply immediately', function () {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedTesterNever />
      </Provider>
    );
    
    const {setPercentage} = mapDispatchToPropsNever(store.dispatch);
    setPercentage(0);
    setPercentage(100);
    
    expect(component.toJSON()).toMatchSnapshot();
  });
});
