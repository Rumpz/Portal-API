const connection = require('db').connection;
const db = 'portal_reporting';
const table = 'templates';

module.exports = (data, callback) => {
  let sql = `INSERT INTO ${table} SET ?`;
  connection(db, sql, data, callback);
};
