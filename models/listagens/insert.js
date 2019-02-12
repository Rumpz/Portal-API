// options imports and Constants
const connection = require('db').connection;
const listTable = 'portal_reporting.temp_list_holder';

function addList (db, data, user, callback) {
  let sql =
  `INSERT IGNORE INTO ${listTable} (field_value, username) VALUES ?`;
  let values = [data, user];
  connection(db, sql, values, callback);
}

module.exports = {
  addList: addList
};
