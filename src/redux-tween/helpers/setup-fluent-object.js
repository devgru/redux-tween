const applyConfig = config => (selection, key) => selection[key](config[key]);

export default (selection, config) =>
  Object.keys(config)
    .filter(key => selection[key])
    .reduce(applyConfig(config), selection);
