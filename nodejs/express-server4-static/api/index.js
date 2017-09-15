const router = require( 'express' ).Router();
const status = require( "./status" );
const eventRouter = require( './event-api' );

router.get( '/$', status );
router.get( '/status', status );
router.use( '/events', eventRouter );

module.exports = router;