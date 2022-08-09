const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/main/js/app.js'),
  output: {
      path: path.resolve(__dirname, 'src/main/webapp'),
      filename: 'bundle.js'
  },
  devtool: 'inline-source-map'
};

