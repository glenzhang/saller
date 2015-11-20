var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var pkg = require('./package');
var ip = require('ip');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://' + ip.address() + ':3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client',
    './src/index.js', // Your appʼs entry point
    // './style/index.less'    Your app's css point
  ],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[hash:4]/app.[hash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-minimize!' + 'autoprefixer-loader!' + 'less?sourceMap'
      )
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMa&-minimize!' + 'autoprefixer-loader'
      )
    }, {
      test: /\.jsx?$/,
      loaders: ['react-hot', 'jsx?harmony', 'babel'],
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html"
    }),
    new ExtractTextPlugin('[hash:4]/app.[hash].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  devtool: 'source-map'
};
