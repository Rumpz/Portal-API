const listagemDeleteModel = require('models').listagens.delete;

module.exports = {
  byUser: byUser
};

function byUser (db, user, callback) {
  listagemDeleteModel.byUser(db, user, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}
