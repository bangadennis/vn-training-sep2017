const uuid = require( 'uuid/v4' );
const moment = require( 'moment' );
const geojsonRandom = require( 'geojson-random' );
const {pgp, db, loadSql} = require( './db' );
const Concept = require( './Concept' );
const Event = require( './Event' );

const generatePoint = () => {
  return geojsonRandom.point( 1 ).features[0].geometry;
};

const generateEvent = concept => {
  return {
    uuid: uuid(),
    createdAt: moment(),
    updatedAt: moment(),
    collectedAt: moment(),
    concept: concept.uuid,
    location: generatePoint(),
    data: {
      a: 1, b: 2, c: 3
    }
  }
};

const insertConcepts = async () => {
  await Concept.insert( {
    uuid: uuid(),
    createdAt: moment(),
    updatedAt: moment(),
    code: 'PER',
    name: 'Persons',
    schema: null
  } )
};

const insertEvents = async (n = 1000) => {
  const concept = await Concept.findByCode( 'PER' );

  if ( concept === null ) {
    throw new Error( 'Could not find concept "PER"' );
  }

  const events = [];

  for ( let i = 0; i < n; i++ ) {
    events.push( generateEvent( concept ) );
  }

  await Event.insert( events );
};

(async () => {
  try {
    await db.none( loadSql( 'sql/create.sql' ) );
    await Concept.create();
    await Event.create();

    await insertConcepts();
    await insertEvents(200000);
  } catch ( e ) {
    console.log( e );
  } finally {
    pgp.end();
  }

})();
