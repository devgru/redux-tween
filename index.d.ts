import {Action, ActionCreatorsMapObject, StoreEnhancer, Reducer} from 'redux';

type easingFn = (normalizedTime: number) => number;

type ConstantOrFunction<N, S> = N | ((datum: Datum<S>) => N);

type Datum<S> = {
  action: Action,
  state: S,
  nextState: S
};

type TweenConfig<S> = {
  duration?: ConstantOrFunction<number, S>,
  delay?: ConstantOrFunction<number, S>,
  ease?: easingFn
};

export function tweenActionCreators<S>(
  creators: ActionCreatorsMapObject,
  tweenConfig?: TweenConfig<S>,
  tweenFilter?: (a: Action) => boolean
): ActionCreatorsMapObject;

export function tweenReducer<S>(r: Reducer<S>): Reducer<S>;
export function tweenStore<S>(
  tweenConfig?: TweenConfig<S>,
  tweenFilter?: (a: Action) => boolean
): StoreEnhancer<S>;
