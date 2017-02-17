const path = require('path');

const fs = require('fs');
const node_modules = fs.readdirSync('node_modules');

const externals = {};
node_modules.forEach(module => externals[module] = module);
externals.react = 'React';

module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',
  
  output: {
    path: path.join(__dirname),
    filename: 'dist.js',
    libraryTarget: 'umd',
    library: 'ReduxTween'
  },
  
  plugins: [],
  
  externals,
  
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-3', 'react']
        }
      }
    ]
  }
};
