const FINDCONTROLLER = require('./find');
const UPDATECONTROLLER = require('./update');

function getOptions (req, res, next) {
  const permission = !req.user ? 'noLog' : req.user.form_permission;
  FINDCONTROLLER.findFormByPermission(permission, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function formByGroupID (req, res, next) {
  const { id } = req.query;
  FINDCONTROLLER.byGroup(id, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function getForm (req, res, next) {
  const { id } = req.query;
  FINDCONTROLLER.formByID(id, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length) res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function updateFormsTable (req, res, next) {
  const user = !req.user ? 'noLog' : req.user.username;
  const ip = req.client['_peername']['address'];
  UPDATECONTROLLER.updateForm(req.body.data, user, ip, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(rows);
  });
}

function refreshTable (req, res, next) {
  const { database, table } = req.query;
  FINDCONTROLLER.tableInfo(database, table, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(rows);
  });
}

module.exports = {
  updateFormsTable: updateFormsTable,
  getOptions: getOptions,
  formByGroupID: formByGroupID,
  getForm: getForm,
  refreshTable: refreshTable
};
