var path = require('path');
var webpack = require("webpack");
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProduction = false;

module.exports = {
  entry: isProduction ? './src/index.js' : './main.js',
  output: {
    filename: isProduction ? 'index.js' : 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-source-map',
  mode: isProduction ? 'production' : 'development',
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

if (isProduction) {
  module.exports.output = Object.assign(module.exports.output, {
    library: 'vue-calendar-mobile-panel',
    libraryTarget: 'umd',
    umdNamedDefine: true
  });
} else {
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
      title: 'demo',
      filename: 'index.html',
      template: './index.html',
      inject: 'body'
    }),
  );
}
