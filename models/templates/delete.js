const connection = require('db').connection;
const db = 'portal_reporting';
const table = 'templates';

module.exports = (id, callback) => {
  let sql =
  `DELETE FROM ${table} WHERE id = ?`;
  connection(db, sql, id, callback);
};
