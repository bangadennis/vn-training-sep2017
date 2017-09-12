/*
const calculate = (a, b) => {
  return new Promise( (res, rej) => {
    if ( !a || !b ) rej( "Both a and b must be defined." );
    setTimeout( () => {
      console.log( a + b );
      res( a + b );
    }, Math.round( Math.random() * 2000 ) )
  } )
};

Promise.all( [
  calculate( 1, 2 ),
  calculate( 4, 2 ),
  calculate( 2, 2 ),
  calculate( 1, 6 )
] ).then( arr => {
  console.log( arr );
} );
*/

const calculate = (a, b) => {
  return new Promise( (res, rej) => {
    setTimeout( () => {
      res( a + b );
    }, Math.round( Math.random() * 2000 ) )
  } )
};

const doWork = async () => {
  const results = [];
  results.push( await calculate( 1, 1 ) );
  results.push( await calculate( 2, 2 ) );

  results.push( await Promise.all( [
    calculate( 3, 3 ),
    calculate( 4, 4 ),
    calculate( 5, 5 )
  ] ) );

  results.push( await calculate( 6, 6 ) );
  results.push( await calculate( 7, 7 ) );

  return results;
};

(async () => {
  const r = await doWork();
  console.log( r );
})();
