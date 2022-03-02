const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./common');

module.exports = {
  entry: {
    vendor: ['styled-components', 'grommet', 'grommet-icons'],
  },
  output: {
    path: common.outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(ttf)$/i,
        type: "asset/resource"
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.css', '.png','.svg', '.jpg', '.jpeg', '.gif']
  },
};
