const {pgp, db, loadSql} = require( './db' );

const SQL = {
  create: loadSql( 'sql/event/create.sql' ),
  insert: loadSql( 'sql/event/insert.sql' )
};

class Event {
  static async create() {
    await db.none( SQL.create );
  }

  static async insert(o) {
    if ( !Array.isArray( o ) ) {
      o = [o];
    }

    return await db.tx( tx => {
      const arr = [];

      o.forEach( v => arr.push( tx.none( SQL.insert, v ) ) );

      return tx.batch( arr );
    } );
  }
}

module.exports = Event;