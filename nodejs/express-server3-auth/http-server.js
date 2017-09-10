const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const uuid = require( 'uuid/v4' );
const {validate} = require( './schema' );
const {passport} = require( './auth' );

const app = express();
app.enable( 'trust proxy' ); // https://expressjs.com/en/guide/behind-proxies.html
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );
app.use( morgan( 'common' ) );
app.use( helmet() );
app.use( passport.initialize() );

const database = {};

app.get( '/', (req, res) => {
  res.json( {
    status: 'OK',
    data: Object.values( database )
  } )
} );

app.get( '/:id', (req, res) => {
  if ( !database[req.params.id] ) {
    res.statusCode = 404;
    res.end();
  }

  res.json( database[req.params.id] );
} );

app.post( '/', passport.authenticate( 'basic', {session: false} ), (req, res) => {
  const valid = validate( req.body );

  if ( !valid ) {
    res.statusCode = 400;
    res.json( {
      status: 'ERROR',
      data: validate.errors
    } );

    return;
  }

  let id = uuid();

  if ( req.body['__id'] ) {
    id = req.body['__id']; // TODO validate uuid
  }

  database[id] = {__id: id, ...req.body};

  res.header( 'Location', id );

  res.json( {
    status: 'OK'
  } )
} );

app.listen( 8080, '127.0.0.1', () => {
  console.info( 'Started server' );
} );
