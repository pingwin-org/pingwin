const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const fs = require('fs');

module.exports = merge(common.config, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      BACKEND_URL: JSON.stringify('/'),
    }),
    //new LiveReloadPlugin({ appendScriptTag: true })
  ]  
});
