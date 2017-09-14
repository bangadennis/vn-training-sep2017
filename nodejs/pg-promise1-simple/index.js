const {pgp, db, loadSql} = require( './db' );

(async () => {
  const sql = loadSql( 'sql/getFromSalesView.sql' );
  const data = await db.many( sql );

  pgp.end();
})();
