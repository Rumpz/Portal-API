// options imports and Constants
const connection = require('db').connection;
const portalDB = 'portal_reporting';
const dumperTable = 'portal_reporting.dumper';

// Dumper connection
const dumperConn = require('db').dumperConnection;

// Exports
module.exports = {
  byUser: byUser
};

function byUser (db, user, callback) {
  console.log('delete DB', db);
  const sql =
  `DELETE
    FROM portal_reporting.temp_list_holder
  WHERE user = ?`;
  connection(db, sql, user, callback);
}
