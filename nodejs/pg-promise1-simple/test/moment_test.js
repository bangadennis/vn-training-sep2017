const moment = require( 'moment' );
const {assert} = require( "chai" );

describe( "moment should allow you to mutate dates and times", () => {
  it( "it should allow you to create dates in the past and format them", () => {
    const test = moment( '2010-01-01' ).format( 'YYYYMM' );
    assert.equal( '201001', test );
  } );

  it( "it should allow you to mutate dates", () => {
    const test = moment( '2010-01-01' );
    test.add( 'day', 500 );
    test.add( 'month', 1 );
    test.add( 'year', 4 );

    test.subtract( 'day', 200 );
    test.subtract( 'month', 2 );
    test.subtract( 'year', 12 );

    assert.equal( 2002, test.year() );
    assert.equal( 8, test.month() );
    assert.equal( 6, test.days() );
  } )
} );