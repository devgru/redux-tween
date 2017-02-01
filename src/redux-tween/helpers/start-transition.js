import setupFluentObject from './setup-fluent-object';

export default (selection, id, config, updateProgress) => {
  selection
    .transition(id)
    .call(setupFluentObject, config)
    .tween(id, () => updateProgress);
};
