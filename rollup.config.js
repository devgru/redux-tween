import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

export default {
  entry: 'lib/index.js',
  format: 'umd',
  dest: 'dist.js',
  context: 'window',
  moduleName: 'ReduxTween',
  plugins: [
    uglify({}, minify)
  ],
  globals: {
    'object-map': 'object-map',
    'd3-color': 'd3-color',
    'd3-selection': 'd3-selection',
    'd3-transition': 'd3-transition',
    'lodash.clonedeep': 'lodash.clonedeep',
    'object-assign': 'object-assign'
  }
};

