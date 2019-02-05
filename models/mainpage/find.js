const connection = require('db').connection;
const dumperConn = require('db').dumperConnection;
const db = 'portal_reporting';
const chartsConfig = 'portal_reporting.charts_config';

function options (callback) {
  let sql =
  `SELECT 
    DISTINCT pagina 
  FROM ${chartsConfig}
  WHERE 
    enable = 1`;
  connection(db, sql, callback);
}

function graphic (values, callback) {
  let sql =
  `SELECT * from ${chartsConfig}
  WHERE 
    pagina = ? AND
    enable = 1
  ORDER BY ordem`;
  connection(db, sql, values, callback);
}

function resumosData (database, sql, callback) {
  dumperConn(database, sql, callback);
}

function graphicData (database, sql, callback) {
  dumperConn(database, sql, callback);
}

module.exports = {
  options: options,
  graphic: graphic,
  graphicData: graphicData,
  resumosData: resumosData
};
