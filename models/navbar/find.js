const connection = require('db').connection;
const db = 'portal_reporting';
const menuTable = 'navbar';

function menus (callback) {
  const sql =
  `SELECT *
  FROM ${menuTable}`;
  connection(db, sql, callback);
}

module.exports = {
  menus: menus
};
