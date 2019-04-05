const path = require('path');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


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
      theme: path.resolve(__dirname, './src/css/descriptions.less'),
      assets: path.resolve(__dirname, './src/assets'),
      '@preloader': path.resolve(__dirname, './src/Components/Preloader')
    }
  },
  plugins: [
    //new webpack.NamedModulesPlugin(),
    // new CleanWebpackPlugin(
    //   ['build'], {
    //     root: path.resolve(__dirname, 'build'),
    //     verbose: true,
    //     dry: false
    //   })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  }
};

module.exports = configuration;
