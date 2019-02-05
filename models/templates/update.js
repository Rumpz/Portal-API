const connection = require('db').connection;
const db = 'portal_reporting';
const table = 'portal_reporting.templates';

module.exports = (id, values, callback) => {
  let sql =
  `UPDATE ${table} SET ? 
    WHERE id = ?`;
  let updateVals = [values, id];
  connection(db, sql, updateVals, callback);
};
