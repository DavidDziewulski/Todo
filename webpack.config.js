require('babel-polyfill');
require('whatwg-fetch');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: [ 
    'babel-polyfill',
    'whatwg-fetch',
    './src/app.js' 
  ],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/bundle.js'
  },
  devtool: "source-map",
  target: 'node',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ 'style-loader', 
        MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader',
          options: {
            url: false,
            
          },
        },
        'postcss-loader',
        'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app.html'
  }),
    new CleanWebpackPlugin('docs', {} ),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
    }),
    new CopyPlugin([
      { from: './src/img', to: './img' }
     
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
    
  ]
};