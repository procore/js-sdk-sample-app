const path = require('path');

const SOURCE_PATH = path.resolve(path.join(__dirname, 'src'));
const OUTPUT_PATH = path.resolve(path.join(__dirname, '..', 'server', 'public'));

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'web',

  entry: {
    app: [path.join(SOURCE_PATH, 'index.jsx')]
  },

  output: {
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: OUTPUT_PATH,
    publicPath: '/'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js?x$/,
        exclude: /(node_modules)/,
        include: SOURCE_PATH,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  }
};
