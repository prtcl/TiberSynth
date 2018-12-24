const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve('static', 'dist'),
    publicPath: '/dist/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loaders: 'babel-loader',
        include: path.resolve('src'),
        query: {
          env: {
            development: {
              plugins: [['transform-react-display-name']],
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
};
