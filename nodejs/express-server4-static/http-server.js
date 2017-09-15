const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const uuid = require( 'uuid/v4' );
const apiRouter = require( './api' );

const app = express();
app.enable( 'trust proxy' ); // https://expressjs.com/en/guide/behind-proxies.html
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );
app.use( morgan( 'common' ) );
app.use( helmet() );
app.use( express.static( 'static' ) );

app.use( '/api$', (req, res, next) => {
  if ( req.method !== 'GET' && req.method !== 'HEAD' ) {
    return next();
  }

  const url = (req.originalUrl || req.url) + '/';
  return res.redirect( url );
} );
app.use( '/api', apiRouter );


app.listen( 8080, '127.0.0.1', () => {
  console.info( 'Started server' );
} );
