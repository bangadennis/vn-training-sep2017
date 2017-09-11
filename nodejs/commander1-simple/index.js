#!/usr/bin/env node

const program = require( 'commander' );
const generateUid = require( './uid' );

program.version( '0.1.0' )
  .description( 'generate dhis2 compatible identifiers (UIDs)' )
  .option( '-l, --limit [limit]', 'number of UIDs to generate', 10 )
  .option( '--json', 'output in json format', false )
  .option( '--csv', 'output in csv format', false );

program.parse( process.argv );

const output = [];

for ( let i = 0; i < program.limit; i++ ) {
  output.push( generateUid() );
}

if ( program.json ) {
  console.log( JSON.stringify( {codes: output} ) );
} else if ( program.csv ) {
  console.log( 'codes' );
  output.forEach( c => console.log( c ) );
} else {
  console.log( output.join( ' ' ) );
}
