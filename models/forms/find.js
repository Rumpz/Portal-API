const connection = require('db').connection;
const formConfigTable = 'portal_reporting.form_cfg';
const formAuxTable = 'portal_reporting.form_cfg_aux';
const db = 'portal_reporting';

function ByPermission (permissions, callback) {
  const sql =
    `SELECT 
      grupo_form 
    FROM ${formConfigTable}
      WHERE permission = ?`;
  connection(db, sql, permissions, callback);
}

function byGroup (group, callback) {
  const sql =
  `SELECT 
    ${formAuxTable}.*
  FROM ${formAuxTable}
    JOIN ${formConfigTable}
      ON ${formConfigTable}.id = ${formAuxTable}.form_FK
  WHERE ${formConfigTable}.group_form = ?`;
  connection(db, sql, group, callback);
}

module.exports = {
  ByPermission: ByPermission,
  byGroup: byGroup
};
