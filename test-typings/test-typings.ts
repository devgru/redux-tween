import {Reducer, createStore, ActionCreatorsMapObject} from 'redux';

import {
  tweenActionCreators,
  tweenReducer, TweenConfig,
  tweenStore
} from '../index';

import {easeLinear} from 'd3-ease';

type Store = {};

const reducer: Reducer<Store> = (s, a) => s;
const a: Reducer<Store> = tweenReducer(reducer);

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

createStore(a, {}, tweenStore(tweenConfig1, Boolean));

const ac1: ActionCreatorsMapObject = tweenActionCreators({}, tweenConfig1, Boolean);
const ac2: ActionCreatorsMapObject = tweenActionCreators({}, tweenConfig2, Boolean);
const ac3: ActionCreatorsMapObject = tweenActionCreators({}, tweenConfig3);
