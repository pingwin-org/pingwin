const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true
  }
});

module.exports.htmlPlugin = htmlPlugin;

module.exports.config = {
  context: __dirname + '/client',
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: path.join( __dirname, '../dist/client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
        { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.png$/, loader: 'url-loader', exclude: /node_modules/ },
        { test: /\.scss$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader'
          }, {
            loader: 'import-glob-loader' // Here is why: https://stackoverflow.com/questions/43283447/import-all-sass-file-within-directory-with-webpack
          }]}
      ]
  },
  resolve: {
  },
  plugins: [
    htmlPlugin
  ]
};
