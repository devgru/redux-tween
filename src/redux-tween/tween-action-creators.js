import mapObject from 'object-map';

let index = 0;
function generateTween(tweenConfig, name) {
  const id = `${index}-${name}`;
  index++;
  return {...tweenConfig, id};
}

export default tweenConfig => {
  const tweenCreatedActions = (creator, name) => (...args) => ({
    ...creator(...args),
    tweenConfig: generateTween(tweenConfig, name)
  });
  
  return creators => mapObject(creators, tweenCreatedActions);
};
