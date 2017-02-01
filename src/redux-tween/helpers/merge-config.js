const defaultTweenConfig = {
  duration: 1000,
  delay: 0
};

export default ({tweenConfig}) => ({...defaultTweenConfig, ...tweenConfig});
