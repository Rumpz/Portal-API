// options imports and Constants
const connection = require('db').connection;

function xlsxToTable (options, values, callback) {
  const db = options.maquina;
  const table = options.tabela_carregamento;
  const colunas = options.colunas.split('|').concat('updatedBy');
  // const truncate = options.TRUNCATE > 0 ? `TRUNCATE ${table};` : '';
  let sql = `INSERT INTO ${table} (${colunas}) VALUES ?`;
  connection(db, sql, [values], callback);
}

function truncateTable (options, callback) {
  const db = options.maquina;
  const table = options.tabela_carregamento;
  let sql = `TRUNCATE ${table}`;
  connection(db, sql, callback);
}

module.exports = {
  xlsxToTable: xlsxToTable,
  truncateTable: truncateTable
};
