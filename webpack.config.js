const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports={
    mode: 'development',
    entry: {
      app: './src/index.js',
      about: './src/about.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    devtool: "source-map", 
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [  MiniCssExtractPlugin.loader ,'css-loader','postcss-loader'],
        },
        {
          test: /\.scss$/,
          use: [
          {loader:  MiniCssExtractPlugin.loader}, // MiniCssExtractPlugin.loader can fallback to 'style-loader'
          {loader: "css-loader", options:{'sourceMap': true}}, 
          {loader: 'postcss-loader',options:{'sourceMap': true}},
          {
            loader: "sass-loader",
            options: {
              includePaths: ["absolute/path/a", "absolute/path/b"],
              'sourceMap': true
            }
          }
      ]
        },
        { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: "babel-loader" 
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Webpack-101'
      }),
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/'
      })

    ]
    
}