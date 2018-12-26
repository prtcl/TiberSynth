const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEV = process.env.NODE_ENV !== 'production';

const BABEL_LOADER = {
  test: /.js$/,
  loaders: 'babel-loader',
  include: path.resolve('src'),
  query: {
    env: {
      development: {
        plugins: ['transform-react-display-name'],
      },
    },
  },
  exclude: /node_modules/,
};

const STYLE_LOADER = {
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: true,
        localIdentName: '[name]-[local]-[hash:base64:5]',
      },
    },
    {
      loader: 'less-loader',
    },
  ],
};

const DEFAULT_CONFIG = {
  ...(DEV
    ? { devtool: 'source-map', mode: 'development' }
    : { mode: 'production' }),
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
    publicPath: '/assets',
  },
  module: {
    rules: [BABEL_LOADER, STYLE_LOADER],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

const CLIENT_CONFIG = {
  ...DEFAULT_CONFIG,
  entry: { client: path.resolve('src', 'index.js') },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
};

const SERVER_CONFIG = {
  ...DEFAULT_CONFIG,
  target: 'node',
  entry: { server: path.resolve('src', 'server.js') },
  output: {
    ...DEFAULT_CONFIG.output,
    libraryTarget: 'commonjs',
  },
};

module.exports = [CLIENT_CONFIG, SERVER_CONFIG];
