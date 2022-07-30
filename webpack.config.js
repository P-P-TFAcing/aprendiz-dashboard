var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/main/js/app.js'),
  output: {
      path: path.resolve(__dirname, 'src/main/webapp'),
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

