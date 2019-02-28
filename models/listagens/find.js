// options imports and Constants
const connection = require('db').connection;
const portalDB = 'portal_reporting';
const dumperTable = 'portal_reporting.dumper';

// Dumper connection
const dumperConn = require('db').dumperConnection;

// Exports
module.exports = {
  getAvailables: getAvailables,
  getOptions: getOptions,
  byUser: byUser
};

function getAvailables (permission, callback) {
  const sql =
  `SELECT
    dumper.id as value,
    dumper.fonte as label,
    dumper.available
  FROM ${dumperTable}
  WHERE
    IFNULL(dumper.listagem, '') != '' AND
    dumper.permission REGEXP ? AND
    dumper.enabled 
    ORDER BY dumper.order`;
  connection(portalDB, sql, permission, callback);
}

function getOptions (id, callback) {
  const sql =
  `SELECT
    dumper.maquina,
    dumper.imagem,
    dumper.tabela,
    dumper.colunas_output,
    dumper.listagem,
    dumper.filtros_datas,
    dumper.available
  FROM ${dumperTable}
  WHERE
    id = ? AND
    dumper.listagem IS NOT NULL AND
    dumper.enabled`;
  connection(portalDB, sql, id, callback);
}

function byUser (user, callback) {
  const sql =
  `SELECT field_value
    FROM portal_reporting.temp_list_holder
  WHERE temp_list_holder.username = ?`;
  dumperConn(portalDB, sql, user, callback);
}
