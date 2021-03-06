const connection = require('db').connection;
const db = 'portal_reporting';
const menuTable = 'portal_reporting.navbar';

function menus (callback) {
  const sql =
  `SELECT *
  FROM ${menuTable}
  ORDER by navbar.order`;
  connection(db, sql, callback);
}

module.exports = {
  menus: menus
};
