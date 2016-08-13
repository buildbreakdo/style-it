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
        'dist/reactive-style-standalone.js'
      )
    :
      (
        __DEV__ ?
          'dist/reactive-style.js'
        :
          'dist/reactive-style.min.js'
      )
    ,
    libraryTarget: 'umd',
    library: 'Style'
  },
  externals: {
	 	'react': 'react',
 		'react-dom' : 'ReactDOM'
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
  :
    [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
        mangle: {
          except: ['Style', 'exports', 'default']
        }
      })
    ]
  ,
};