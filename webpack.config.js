const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('www', 'dist'),
    publicPath: '/dist/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loaders: 'babel-loader',
        include: path.resolve('src'),
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
