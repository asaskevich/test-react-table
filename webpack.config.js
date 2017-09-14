var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/dist');
var APP_DIR = path.resolve(__dirname, 'public/src');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        use: [
          "babel-loader",
          "eslint-loader",
        ],
      },
      {
        test : /\.less/,
        include : APP_DIR,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      }
    ]
  }
};

module.exports = config;