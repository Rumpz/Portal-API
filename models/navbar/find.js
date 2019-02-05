const connection = require('db').connection;
const db = 'portal_reporting';
const menuTable = 'portal_reporting.navbar';

function menus (permission, callback) {
  const sql =
  `SELECT *
    FROM ${menuTable}
  WHERE ? REGEXP permission
    ORDER by navbar.order`;
  connection(db, sql, permission, callback);
}

module.exports = {
  menus: menus
};
