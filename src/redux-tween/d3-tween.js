import {transition} from 'd3-transition';

export default (id, config, tick) => {
  const selection = transition(id);
  
  const onTween = () => (t) => tick(t, id);
  applyD3StyleConfig(selection, config).tween(id, onTween);
};

function applyD3StyleConfig(object, config) {
  return Object.keys(config)
    .filter(key => object[key])
    .reduce((object, key) => object[key](config[key]), object);
}