// options imports and Constants
const connection = require('db').connection;
const db = 'portal_reporting';
const table = 'portal_reporting.carregamentos';

function tableOptions (permission, callback) {
  let sql = `
    SELECT 
      carregamentos.id as 'value',
      carregamentos.nome_carregamento as 'label'
    FROM ${table}
    WHERE 
      carregamentos.permission REGEXP ? AND
      carregamentos.enabled`;
  connection(db, sql, permission, callback);
}

function optionsByID (id, callback) {
  let sql = `
    SELECT
      carregamentos.maquina,
      carregamentos.tabela_carregamento,
      carregamentos.colunas,
      carregamentos.procedimento,
      carregamentos.TRUNCATE
    FROM ${table}
      WHERE carregamentos.id = ?`;
  connection(db, sql, id, callback);
}

function byProcedure (database, sql, callback) {
  connection(database, sql, callback);
}

module.exports = {
  tableOptions: tableOptions,
  optionsByID: optionsByID,
  byProcedure: byProcedure
};
