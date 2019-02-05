const connection = require('db').connection;
const db = 'portal_reporting';
const table = 'portal_reporting.templates';

module.exports = {
  all: all,
  byID: byID
};

function all (values, callback) {
  let sql = `SELECT * FROM ${table} WHERE page = ? and fonte_FK = ?`;
  connection(db, sql, values, callback);
}

function byID (values, callback) {
  let sql =
  `SELECT * FROM ${table}
    WHERE id = ? AND page = ?`;
  connection(db, sql, values, callback);
}
