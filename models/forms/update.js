const connection = require('db').connection;

function tableByID (values, callback) {
  const sql =
    `UPDATE ${values[0]['tabela']}
      SET ? 
    WHERE id = ?`;
  const vals = [
    values[1],
    values[0]['id']
  ];
  const db = values[0]['dbConnection'];
  connection(db, sql, vals, callback);
}

module.exports = {
  tableByID: tableByID
};
