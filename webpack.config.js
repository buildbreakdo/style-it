var webpack = require('webpack');

var __DEV__ = JSON.parse(process.env.NODE_ENV !== 'production');
var __STANDALONE__ = process.argv.some(function(arg) {return arg === '--standalone'});

module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-1']
        }
      }
    ]
  },
  output: {
    filename: __STANDALONE__ ?
      (
        'dist/style-it-standalone.js'
      )
    :
      (
        __DEV__ ?
          'dist/style-it.js'
        :
          'dist/style-it.min.js'
      )
    ,
    libraryTarget: 'umd',
    library: 'Style'
  },
  externals: {
 	  "react": {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
     }
  },
  plugins: __DEV__ ?
    [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  : // else __PROD__
    [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: true,
          screw_ie8: true, // React doesn't support IE8
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
          except: ['Style', 'exports', 'default']
        },
        output: {
          comments: false,
          screw_ie8: true,
        }
      })
    ]
  ,
};