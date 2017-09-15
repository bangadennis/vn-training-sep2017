const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var CleanWebpackPlugin = require( 'clean-webpack-plugin' );
var CopyWebpackPlugin = require( 'copy-webpack-plugin' );

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
          },
          {test: /\.png$/, loader: "file-loader?mimetype=image/png&name=images/[name].[ext]"},
          {test: /\.jpg$/, loader: "file-loader?mimetype=image/jpg&name=images/[name].[ext]"},
        ]
      }
    ,
    plugins: [
      new HtmlWebpackPlugin( {
        title: 'ReactJS Simple Example',
        template: path.join( __dirname, 'src/index.ejs' )
      } ),
      new CleanWebpackPlugin( ["dist/*"], {
        root: __dirname,
        verbose: true,
        dry: false
      } ),
      new CopyWebpackPlugin( [
        {from: "./node_modules/leaflet/dist/images", to: "images"}
      ] )
    ],
    devServer:
      {
        port: 8080
      }
  }
};