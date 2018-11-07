const model = require('models').user;
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  update: update,
  changePassword: changePassword
};

function update (req, res, next) {
  let tomodel = {
    id: req.body.id,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    data_nascimento: req.body['Data Nascimento'],
    data_entrada: req.body['Data Entrada'],
    foto: req.body.picture,
    phonenumber: req.body.cellnumber,
    carta_conducao: req.body.driverslicence,
    cartao_nos: req.body.noscard,
    comments: req.body.obs,
    state: req.body.state,
    group: req.body.group
  };

  model.update(tomodel, function (err, rows) {
    if (err) next(err);
    next(null, rows);
  });
}

function changePassword (req, res, next) {
  let {username, password} = req.body;
  password = bcrypt.hashSync(password, null, null);
  model.newPassword(username, password, (err, response) => {
    if (err) return res.status(500).json(err);
    res.redirect('/');
  });
}
