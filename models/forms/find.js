const connection = require('db').connection;
const formConfigTable = 'portal_reporting.form_cfg';
const formAuxTable = 'portal_reporting.form_cfg_aux';
const db = 'portal_reporting';

function byPermission (permissions, callback) {
  const sql =
    `SELECT 
      GROUP_CONCAT(id) as value,
      grupo_form as label
    FROM ${formConfigTable}
      WHERE permission REGEXP ? AND
      enabled
    GROUP BY label`;
  connection(db, sql, permissions, callback);
}

function byGroup (id, callback) {
  const sql =
  `SELECT 
    ${formConfigTable}.id AS 'value',
    ${formConfigTable}.nome_form AS 'label'
  FROM ${formConfigTable}
    WHERE
      ${formConfigTable}.id IN (?)`;
  connection(db, sql, [id], callback);
}

function byID (id, callback) {
  const sql =
  `SELECT
    ${formConfigTable}.maquina,
    ${formConfigTable}.mensagem,
    ${formConfigTable}.proc_antes,
    ${formConfigTable}.proc_depois,
    ${formConfigTable}.procedureArgs,
    ${formConfigTable}.procedure_cols,
    ${formConfigTable}.tabela_dados,
    ${formConfigTable}.nome_form,
    ${formAuxTable}.campo,
    ${formAuxTable}.label,
    ${formAuxTable}.modal,
    ${formAuxTable}.detail,
    ${formAuxTable}.table,
    ${formAuxTable}.modalOrder,
    ${formAuxTable}.detailOrder,
    ${formAuxTable}.tableOrder,
    ${formAuxTable}.editable,
    ${formAuxTable}.tipo,
    ${formAuxTable}.select_opt,
    ${formAuxTable}.placeholder
  FROM ${formConfigTable}
    LEFT JOIN  ${formAuxTable} ON ${formAuxTable}.form_FK = ${formConfigTable}.id
  WHERE form_cfg.id = ? 
  ORDER BY tableOrder`;
  connection(db, sql, id, callback);
}

function fieldsData (database, table, callback) {
  let sql =
  `SELECT * FROM ${table}`;
  connection(database, sql, callback);
}

function byProcedure (database, sql, values, callback) {
  connection(database, sql, values, callback);
}

function tableInfo (database, table, user, callback) {
  let sql =
  `SELECT * FROM ${table} WHERE RequestedBy = ?`;
  connection(database, sql, user, callback);
}

module.exports = {
  byPermission: byPermission,
  byGroup: byGroup,
  fieldsData: fieldsData,
  byProcedure: byProcedure,
  tableInfo: tableInfo,
  byID: byID
};
