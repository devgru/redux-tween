export default (utility, setup) => {
  Object
    .keys(setup)
    .filter(key => typeof utility[key] === 'function')
    .forEach(key => utility[key](setup[key]));
}
