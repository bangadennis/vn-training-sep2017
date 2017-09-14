// https://mochajs.org/
// http://chaijs.com/api/assert

const uuid = require( '../uuid-generator2' );
const isUuid = require( 'is-uuid' );
const {assert} = require( "chai" );

describe( "generator2 should generate v4 compatible UUIDs", () => {
  it( "it should generate strings", () => {
    assert.isString( uuid() );
  } );

  it( "it should generate uuid v4 compatible UUIDs", () => {
    assert.isTrue( isUuid.v4( uuid() ), "is not a valid uuid" );
  } );

  it( "it should not generate uuid v1,v2,v3,v5 compatible UUIDs", () => {
    assert.isFalse( isUuid.v1( uuid() ), "should not be v1 compatible" );
    assert.isFalse( isUuid.v2( uuid() ), "should not be v2 compatible" );
    assert.isFalse( isUuid.v3( uuid() ), "should not be v3 compatible" );
    assert.isFalse( isUuid.v5( uuid() ), "should not be v5 compatible" );
  } );
} );