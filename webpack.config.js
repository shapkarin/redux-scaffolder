const path = require('path');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


const configuration = {
  context: path.join(__dirname, 'src/'),
  entry: {
    index: './cli/init.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'static/[name].js',
    chunkFilename: '[name].[ext]',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['node_modules', 'libs', 'src'],
    alias: {
      Components: path.resolve(__dirname, './src/Components'),
      Utils: path.resolve(__dirname, './src/utils'),
    }
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
              plugins: ['lodash']
            }
          }
        ]
      }
    ]
  }
};

module.exports = configuration;
