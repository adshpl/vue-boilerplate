const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const DotEnvPlugin = require('dotenv-webpack');

const baseConfig = require('./base');

const configurationPath = path.join(__dirname, '../../configuration');

module.exports = merge(baseConfig, {
  entry: './index',
  mode: 'production',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new DotEnvPlugin({
      path: `${configurationPath}/environment/production`,
    }),
  ],
});
