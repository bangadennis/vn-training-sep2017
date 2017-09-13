const path = require( 'path' );
const uuid = require( 'uuid/v4' );
const moment = require( 'moment' );
const faker = require( 'faker' );
const pgp = require( "pg-promise" )( {} );
const {QueryFile} = pgp;
const db = pgp( "postgres://localhost:5432/vndemo1" );

const loadSql = file => {
  const fullPath = path.join( __dirname, file );
  return new QueryFile( fullPath, {minify: true, compress: true} );
};

const createTables = async () => {
  const sql = loadSql( './sql/create_table.sql' );
  await db.none( sql );
};

const insertPeriods = async () => {
  const sql = loadSql( './sql/insert_period.sql' );
  let start = moment( '2010-01-01' );

  // year
  for ( let i = 0; i < 10 - 1; i++ ) {
    const end = start.clone().add( 1, 'year' ).subtract( 1, 'day' );
    const pattern = moment.duration( 1, 'year' );

    await db.none( sql, {
      uuid: uuid(),
      createdAt: moment().format(),
      updatedAt: moment().format(),
      name: start.format( 'YYYY' ),
      pattern,
      lowerBound: start.format(),
      upperBound: end.format(),
      month: null,
      year: start.year()
    } );

    start.add( 1, 'year' );
  }

  start = moment( '2010-01-01' );

  // year+month
  for ( let i = 0; i < (10 * 12) - 1; i++ ) {
    const end = start.clone().add( 1, 'month' ).subtract( 1, 'day' );
    const pattern = moment.duration( 1, 'month' );

    await db.none( sql, {
      uuid: uuid(),
      createdAt: moment().format(),
      updatedAt: moment().format(),
      name: start.format( 'YYYYMM' ),
      pattern,
      lowerBound: start.format(),
      upperBound: end.format(),
      month: start.month() + 1,
      year: start.year()
    } );

    start.add( 1, 'month' );
  }
};

const createValue = (max = 10000, min = 0) => {
  return Math.round( Math.random() * (max - min) ) + min;
};

const insertData = async (n = 10) => {
  const sql = loadSql( './sql/insert_event.sql' );

  await db.tx( tx => {
    const arr = [];

    for ( let i = 0; i < n; i++ ) {
      arr.push( tx.one( sql, createData( Math.round( Math.random() * 3 ) ) ) )
    }

    return tx.batch( arr );
  } );
};

const createData = (n = 10) => {
  const date = moment( faker.date.between( '2010-01-01', '2017-12-31' ) ).utc().format();
  const data = [];

  for ( let i = 0; i < n; i++ ) {
    data.push( {
      category: ['A', 'B', 'C'][Math.floor( Math.random() * 3 )],
      value: createValue( 1000, 200 )
    } );
  }

  return {
    uuid: uuid(),
    createdAt: moment().format(),
    updatedAt: moment().format(),
    collectedAt: date,
    location: null,
    data
  }
};

(async () => {
  await createTables();
  await insertPeriods();
  await insertData( 10000 );

  pgp.end();
})();