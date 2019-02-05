const connection = require('db').connection;
const table = 'portal_reporting.logs';

function logAction (values, callback) {
  const sql = `INSERT INTO ${table} SET ?`;
  connection('portal_reporting', sql, values, callback);
}

module.exports = {
  logAction: logAction
};
