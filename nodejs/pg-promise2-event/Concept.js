const {pgp, db, loadSql} = require( './db' );

const SQL = {
  create: loadSql( 'sql/concept/create.sql' ),
  insert: loadSql( 'sql/concept/insert.sql' )
};

class Concept {
  static async create() {
    await db.none( SQL.create );
  }

  static async insert(o) {
    await db.none( SQL.insert, o );
  }

  static async findByCode(code) {
    try {
      return await db.one( 'SELECT * FROM pgp_concept WHERE code=${code}', {code} );
    } catch ( e ) {
    }

    return null;
  }
}

module.exports = Concept;