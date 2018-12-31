const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
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

const LESS_LOADER = {
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
      loader: 'postcss-loader',
      options: {
        sourceMap: 'inline',
        plugins: [autoprefixer()],
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
    filename: '[name].[contentHash].js',
    path: path.resolve('dist'),
    publicPath: '/assets/',
  },
  module: {
    rules: [BABEL_LOADER, LESS_LOADER],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css',
      chunkFilename: '[id].[contentHash].css',
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(
          __dirname,
          'node_modules',
          'opus-media-recorder',
          'dist'
        ),
        to: '[name].[ext]',
        toType: 'template',
      },
      {
        from: path.join(__dirname, 'images'),
        to: '[name].[ext]',
        toType: 'template',
      },
    ]),
  ],
};

const CLIENT_CONFIG = merge(DEFAULT_CONFIG, {
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
  plugins: [new ManifestPlugin({ fileName: 'manifest.client.json' })],
});

const SERVER_CONFIG = merge(DEFAULT_CONFIG, {
  target: 'node',
  entry: { server: path.resolve('src', 'server.js') },
  output: {
    libraryTarget: 'commonjs',
  },
  plugins: [new ManifestPlugin({ fileName: 'manifest.server.json' })],
});

module.exports = [CLIENT_CONFIG, SERVER_CONFIG];
