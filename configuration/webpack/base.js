const webpack = require('webpack');
const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin  = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = path.join(__dirname, '../../src');
const buildPath = path.join(__dirname, '../../build');
const configurationPath = path.join(__dirname, '../../configuration');
const modulesPath = path.join(__dirname, '../../node_modules');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  context: sourcePath,
  output: {
    filename: '[name].[hash].js',
    path: buildPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: `${configurationPath}/eslint/.eslintrc`,
        },
      },
      {
        test: /\.vue?$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          configFile: `${configurationPath}/babel/.babelrc`,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name].[local].[hash]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')({
                  resolve: id => id.replace('@', sourcePath),
                }),
                require('postcss-url')(),
                require('postcss-cssnext')(),
                require('cssnano'),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      modulesPath,
      sourcePath,
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': sourcePath,
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
        },
      },
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      configFile: `${configurationPath}/stylelint/.stylelintrc`,
      files: ['**/*.css', '**/*.vue'],
      syntax: 'css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
    new webpack.DefinePlugin({
      __DEV__: NODE_ENV === 'development',
      __PROD__: NODE_ENV === 'production',
    }),
    new webpack.NamedModulesPlugin(),
  ],
};
