const router = require( 'express' ).Router();

router.get( '/', (req, res) => {
  return res.json( {
    status: 'OK',
    data: [
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3},
      {a: 1, b: 2, c: 3}
    ]
  } );
} );

module.exports = router;