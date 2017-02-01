import mapObject from 'object-map';

export default tweenConfig => {
  const tweenCreatedActions = (creator, id) => (...args) => ({
    ...creator(...args),
    tweenConfig: {...tweenConfig, id}
  });
  
  return creators => mapObject(creators, tweenCreatedActions);
};
