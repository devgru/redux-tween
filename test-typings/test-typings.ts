import {Reducer, createStore, ActionCreatorsMapObject} from 'redux';

import {
  tweenActionCreators,
  tweenMiddleware,
  tweenReducer, TweenConfig
} from '../index';

import {easeLinear} from 'd3-ease';

type Store = {};

const reducer: Reducer<Store> = (s, a) => s;
const a: Reducer<Store> = tweenReducer(reducer);

createStore(a, tweenMiddleware);

const tweenConfig1: TweenConfig<Store> = {
  ease: easeLinear,
  duration: 1000,
  delay: 1000
};

const tweenConfig2: TweenConfig<Store> = {
  ease: easeLinear,
  duration: () => 1000,
  delay: () => 1000
};

const tweenConfig3: TweenConfig<Store> = {};

const ac1: ActionCreatorsMapObject = tweenActionCreators({}, tweenConfig1, Boolean);
const ac2: ActionCreatorsMapObject = tweenActionCreators({}, tweenConfig2, Boolean);
const ac3: ActionCreatorsMapObject = tweenActionCreators({}, tweenConfig3);
