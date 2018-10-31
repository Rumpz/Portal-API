const mysql = require('mysql');
const ENV = process.env.NODE_ENV || 'dev';
const devConfig = require(`./dev`);
const testConfig = require(`./test`);
const portalDimConfig = require('./portalDimc.json');
const connectionError = {'code': 100, 'status': 'Error in connection database'};
const pool = mysql.createPool(devConfig);
const dimcPool = mysql.createPool(portalDimConfig);
const poolTest = mysql.createPool(testConfig);

module.exports = (database, sql, values, callback) => {
  let pools = {
    WSTPVFIA001: pool,
    SVLGOIPFE05: dimcPool,
    portal_test: poolTest,
    fia: pool,
    noDB: pool
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
    console.log('connected as id ' + connection.threadId);

    /* if (database !== 'noDB') {
      connection.query(`USE ${database}`, (err) => {
        if (err) return callback(err);
      });
    } */

    let query = connection.query(sql, values, (err, rows) => {
      connection.release();
      if (err) return callback(err);
      callback(null, rows);
    });
    if (process.env === 'DEV') console.log(query.sql);
    // if (process.env.DBlOGS);
  });
};
