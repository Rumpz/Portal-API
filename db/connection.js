const mysql = require('mysql');
const ENV = process.env.NODE_ENV || 'dev';
const connectionError = {'code': 100, 'status': 'Error in connection database'};
const testENV = process.env.NODE_ENV !== 'test';
// DB configs
// const fiaConfig = require(`./fia`);
const navigationConfig = require('./navigation');

// Pool configs
// const fiaPool = mysql.createPool(fiaConfig);
const navigationPool = mysql.createPool(navigationConfig);

module.exports = (database, sql, values, callback) => {
  let pools = {
    portal_reporting: navigationPool
  };

  /* database = process.env.NODE_ENV
    ? 'portal_test'
    : database;
  */

  if (typeof values === 'function') {
    callback = values;
    values = [];
  }
  pools[database].getConnection(function (err, connection) {
    if (err) return callback(connectionError);
    if (testENV) console.log('connected as id ' + connection.threadId);

    if (database !== 'noDB') {
      connection.query(`USE ${database}`, (err) => {
        if (err) return callback(err);
      });
    }

    let query = connection.query(sql, values, (err, rows) => {
      connection.release();
      if (err) return callback(err);
      callback(null, rows);
    });
    if (testENV) console.log(query.sql);
  });
};
