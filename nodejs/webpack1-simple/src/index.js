const {generateUuid1: generate, generateUuid3} = require( 'uuidgen' );
const generateUuid2 = require( 'uuidgen' ).generateUuid2;

console.log( generate() );
console.log( generateUuid2() );
console.log( generateUuid3() );
