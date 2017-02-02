import mapObject from 'object-map';

let nextId = 0;
export default tweenConfig => {
  const id = nextId;
  nextId++;
  
  const tweenCreatedActions = (creator) => (...args) => ({
    ...creator(...args),
    tweenConfig: {...tweenConfig, id}
  });
  
  return creators => mapObject(creators, tweenCreatedActions);
};
