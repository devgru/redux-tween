import uglify from 'rollup-plugin-uglify-es';

export default {
  entry: 'lib/index.js',
  format: 'umd',
  dest: 'dist.js',
  context: 'window',
  moduleName: 'ReduxTween',
  plugins: [
    uglify()
  ],
  globals: {
    'object-map': 'object-map',
    'd3-color': 'd3-color',
    'd3-selection': 'd3-selection',
    'd3-transition': 'd3-transition',
    'd3-interpolate': 'd3-interpolate',
    'lodash.clonedeep': 'lodash.clonedeep',
    'object-assign': 'object-assign'
  }
};

