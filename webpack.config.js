var path = require('path');

var SOURCE_JS_DIR = path.resolve(__dirname, 'src/main/webapp/app');
var BUILD_DIR = path.resolve(__dirname, 'src/main/webapp');

module.exports = {
  entry: path.resolve(__dirname, 'src/main') + '/js/app.js',
  output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
  },
  debug: true,
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src/main/webapp/js'),
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: "./src/main/webapp"
  }
};

