const {generateUuid1: generate} = require( 'uuidgen' );
const generateUuid2 = require( 'uuidgen' ).generateUuid2;

console.log( generate() );
console.log( generateUuid2() );