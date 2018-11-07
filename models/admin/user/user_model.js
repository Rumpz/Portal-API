
// Common-parts-of-all-models++++++++++++++++++++++++++++++++++
const connection = require('db').connection;
const table = `portal_reporting.users`;
var db = `portal_reporting`;

module.exports = {
  all: all,
  selectID: oneId,
  selectName: oneName,
  allGroup: allGroup,
  insert: insert,
  update: save,
  remove: remove,
  allpage: allp,
  newPassword: password,
  reset: reset,
  allG: allG,
  required: required,
  allActiveUsersConcatedName: allActiveUsersConcatedName
};

function all (callback) {
  var sql = `SELECT * from ${table}`;
  connection(db, sql, callback);
}

function allp (callback) {
  var sql = `SELECT id, username, firstName, lastName, group_permission, state FROM ${table}`;
  connection(db, sql, callback);
}

function allGroup (group, callback) {
  var sql = `SELECT * FROM ${table} WHERE group_permission = ?`;
  var values = [group];
  connection(db, sql, values, callback);
}

function required (req, id, callback) {
  let sql = `UPDATE ${table} set required = ? WHERE id = ?`;
  let values = [req, id];
  connection(db, sql, values, callback);
}

function allG (group, callback) {
  let sql = `SELECT * FROM ${table} WHERE group_permission = ?`;
  let values = [group];
  connection(db, sql, values, callback);
}

function oneId (id, callback) {
  var sql = `SELECT * from ${table} WHERE id = ?`;
  var values = id;
  connection(db, sql, values, callback);
}

function oneName (username, callback) {
  var sql = `SELECT * from ${table} WHERE username = ?`;
  var values = username;
  connection(db, sql, values, callback);
}

function insert (data, callback) {
  var sql = `INSERT INTO ${table} SET state= ?,comments = ?,cartao_nos = ? ,carta_conducao = ?, phonenumber = ?,foto = ?,data_entrada = ?, data_nascimento = ?,username = ?, firstName = ?, lastName = ?, email = ?, password = ?, firstLogIn = "True"`;
  var values = [data.state, data.comments, data.cartao_nos, data.carta_conducao, data.phonenumber, data.foto, data.data_entrada, data.data_nascimento, data.username, data.firstName, data.lastName, data.email, data.password];
  connection(db, sql, values, callback);
}

function save (data, callback) {
  var sql = `UPDATE ${table} SET group_permission= ?,state= ?,comments = ?,cartao_nos = ?,carta_conducao = ?, phonenumber = ?,foto = ?,data_entrada = ?, data_nascimento =?,username = ?, firstName = ?, lastName = ?, email = ? WHERE id = ?`;
  var values = [data.group, data.state, data.comments, data.cartao_nos, data.carta_conducao, data.phonenumber, data.foto, data.data_entrada, data.data_nascimento, data.username, data.firstName, data.lastName, data.email, data.id];
  connection(db, sql, values, callback);
}

function password (user, password, callback) {
  var sql = `UPDATE ${table} SET password = ? , firstLogIn = "False" WHERE username= ?`;
  var values = [password, user];
  connection(db, sql, values, callback);
}
function remove (id, callback) {
  var sql = `UPDATE ${table} SET state = "Inactive" WHERE id = ?`;
  var values = [id];
  connection(db, sql, values, callback);
}

function reset (id, pass, callback) {
  var sql = `UPDATE ${table} SET firstLogIn = "True" , password = ? WHERE id = ?`;
  var values = [pass, id];
  connection(db, sql, values, callback);
}

function allActiveUsersConcatedName (callback) {
  let sqlUsersconnection =
  `SELECT id as value, CONCAT_WS(' ', firstName, lastName) as name 
  FROM ${table} WHERE state = ?
  AND (group_permission = 'Operador'
  OR group_permission = 'Pivot'
  OR group_permission = 'Supervisor')`;
  let values = [`Active`];
  connection(db, sqlUsersconnection, values, callback);
}
