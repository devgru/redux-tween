const tweens = {};

export const setupTween = (id, tween) => {
  tweens[id] = tween;
};

export const tweenState = (id, progress) => {
  const tween = tweens[id];
  const state = tween(progress);
  if (progress === 1) delete tweens[id];
  return state;
};