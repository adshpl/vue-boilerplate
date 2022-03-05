const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const DotEnvPlugin = require('dotenv-webpack');

const baseConfig = require('./base');

const sourcePath = path.join(__dirname, '../../src');
const configurationPath = path.join(__dirname, '../../configuration');

module.exports = merge(baseConfig, {
  entry: './index',
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: sourcePath,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DotEnvPlugin({
      path: `${configurationPath}/environment/development`,
    }),
  ],
});
