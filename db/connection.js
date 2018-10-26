const mysql = require('mysql');
const ENV = process.env.NODE_ENV || 'dev';
const devConfig = require(`./dev`);
const testConfig = require(`./test`);
const connectionError = {'code': 100, 'status': 'Error in connection database'};
const pool = mysql.createPool(devConfig);
const poolTest = mysql.createPool(testConfig);

module.exports = (database, sql, values, callback) => {
  let pools = {
    portal_reporting: pool,
    portal_test: poolTest,
    fia: pool,
    noDB: pool
  };

  /* database = process.env.NODE_ENV
    ? 'portal_test'
    : database; */

  if (typeof values === 'function') {
    callback = values;
    values = [];
  }
  pools[database].getConnection(function (err, connection) {
    if (err) return callback(connectionError);
    console.log('connected as id ' + connection.threadId);

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
    console.log(query.sql);
    // if (process.env.DBlOGS) ;
  });
};