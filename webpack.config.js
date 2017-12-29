const {resolve} = require('path')

module.exports =  ({dev})=>({
  entry: ['babel-regenerator-runtime', './index.js'],
  devServer:{contentBase: resolve('web')},
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'web')
  },
  devtool:  dev ? 'eval': 'source-map',

  module:{ rules:[
    {test: /\.js$/, loaders:['babel-loader'], exclude: /node_modules/},
    {test: /\.(gif|jpe?g|png|svg|ttf|eot)$/, loader: 'file-loader'},
  ]},

  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-router-native': 'react-router-dom',
      'react-native-vector-icons/FontAwesome':'react-native-vector-icons/dist/FontAwesome'
    }
  }

})
