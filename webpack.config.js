const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/build/index'),
    error: path.join(__dirname, 'src/build/error'),
    mail_login: path.join(__dirname, 'src/build/mail_login'),
    'try.anoop': path.join(__dirname, 'src/build/try.anoop'),
    'try.rod': path.join(__dirname, 'src/build/try.rod')
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: ENV === 'production' ? '[name].[chunkhash].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      ENV === 'production'
        ? '../css/[name].[chunkhash].css'
        : '../css/[name].css'
    ),
    new ManifestPlugin({
      fileName: path.join(__dirname, './src/build/webpack-manifest.json'),
      map: obj => {
        obj.path = obj.path.split('/').slice(-1)[0];
        return obj;
      }
    })
  ]
};
