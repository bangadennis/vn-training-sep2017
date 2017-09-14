const path = require( 'path' );
const pgp = require( "pg-promise" )( {} );
const db = pgp( "postgres://localhost:5432/academy" );

const loadSql = file => {
  const fullPath = path.join( __dirname, file );
  return new pgp.QueryFile( fullPath, {minify: true, compress: true} );
};

module.exports = {
  pgp, QueryFile: pgp.QueryFile, db, loadSql
};