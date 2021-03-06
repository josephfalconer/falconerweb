const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('../css/styles.css');

const autoPrefixer = require('autoprefixer');

module.exports = {
  entry: './static/js/src/index.js',
  output: {
    path: path.join(__dirname, 'static/js'),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            ["transform-es2015-for-of", {
              "loose": true
            }]
          ],
        }
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract({
          fallback: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          use: [
            {
              loader: 'css-loader',
              options: {
                outputStyle: 'compressed',
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [autoPrefixer]
                },
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins:[
    extractCSS
  ],
};
