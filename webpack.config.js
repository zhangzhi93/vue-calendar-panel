var path = require('path');
var webpack = require("webpack");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // library: 'vue-calendar-mobile-panel',
    // libraryTarget: 'umd',
    // umdNamedDefine: true
  },
  devtool: 'source-map',
  mode: 'development',
  // mode: 'production',
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: "babel-loader"
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'less-loader'
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'demo',
      filename: 'index.html',
      template: './index.html',
      inject: 'body'
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    compress: true,
    host: 'localhost',
    port: 6060,
    open: true,
    inline: true,
    progress: true, //显示打包的进度
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        secure: false
      }
    },
  }
}
