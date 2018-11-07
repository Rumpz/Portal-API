const connection = require('db').connection;
const db = 'portal_reporting';
const table = 'templates';

module.exports = (id, values, callback) => {
  let sql =
  `UPDATE ${table} SET ? 
    WHERE id = ?`;
  let updateVals = [values, id];
  connection(db, sql, updateVals, callback);
};
