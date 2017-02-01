import {select} from 'd3-selection';
import {interrupt} from 'd3-transition';

const roots = {};

export default id => {
  if (roots[id])
    interrupt(roots[id], id);
  else
    roots[id] = {};
  
  return select(roots[id]);
};