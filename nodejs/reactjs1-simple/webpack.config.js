const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = () => {
  return {
    entry: './src/js/index',
    output: {
      path: path.join( __dirname, 'dist' ),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module:
      {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    ,
    plugins: [
      new HtmlWebpackPlugin( {
        title: 'ReactJS Simple Example',
        template: path.join( __dirname, 'src/index.ejs' )
      } )
    ],
    devServer:
      {
        port: 8080
      }
  }
};