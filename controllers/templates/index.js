const errMsg = 'No template found';
const FINDCONTROLLER = require('./find.js');
const INSERTCONTROLLER = require('./insert.js');
const UPDATECONTROLLER = require('./update.js');
const DELETECONTROLLER = require('./delete.js');

module.exports = {
  findAll: findAll,
  findByID: findByID,
  insert: insert,
  update: update,
  deleteTemplate: deleteTemplate
};

function findAll (req, res, next) {
  FINDCONTROLLER.all(req.query, (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length) return res.status(404).json(errMsg);
    res.status(200).json(results);
  });
}

function findByID (req, res, next) {
  let {page} = req.query;
  let id = req.params.id;
  if (!id) return res.status(400).json('invalid params');
  FINDCONTROLLER.byID(page, id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length) return res.status(404).json(errMsg);
    res.status(200).json(results);
  });
}

function insert (req, res, next) {
  let data = req.body;
  if (!data.name) return res.status(400).json('invalid params');
  data = Object.assign({user: req.user.username}, data);
  INSERTCONTROLLER(data, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
}

function update (req, res, next) {
  let id = req.params.id;
  let values = req.body;
  values = Object.assign({user: req.user.username}, values);
  if (!id) return res.status(400).json('invalid params');
  UPDATECONTROLLER(id, values, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
}

function deleteTemplate (req, res, next) {
  let id = req.params.id;
  if (!id) return res.status(400).json('invalid params');
  DELETECONTROLLER(id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
}
