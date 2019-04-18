const FINDCONTROLLER = require('./find');
const INSERTCONTROLLER = require('./insert');

function getTableOptions (req, res, next) {
  let permission = '';
  if (process.env.NODE_ENV === 'Production') {
    permission = req.user.upload_permission;
  } else {
    permission = '^BI$|^GERAL$';
  }
  FINDCONTROLLER.getTableOptions(permission, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(rows);
  });
}

function getOptions (req, res, next) {
  const { id } = req.query;
  FINDCONTROLLER.getOptionsByID(id, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function importXLXS (req, res, next) {
  let user = '';
  if (process.env.NODE_ENV === 'Production') {
    user = `${req.user.username}|${req.client['_peername']['address']}`;
  } else {
    user = 'devOps';
  }

  const options = req.query;
  const file = req.file.buffer;

  INSERTCONTROLLER.insertXLSX(user, options, file, (err, insertInfo) => {
    if (err) return res.status(500).json(err);
    // If table is Truncated the Insert OKPacket comes on the second array element
    // if (+options.TRUNCATE) insertInfo = insertInfo[1];
    /* if (options.procedimento) { */
    FINDCONTROLLER.byProcedure(options.maquina, options.procedimento, (err, procResponse) => {
      if (err) return res.status(500).json(err);
      const responseObject = {
        success: procResponse[0][0]['success'],
        message: procResponse[0][0]['message'],
        insertedRows: {affectedRows: insertInfo}
      };
      res.status(200).json(responseObject);
    });
  });
  /* res.status(200).json(insertInfo);
  }); */
}

module.exports = {
  getTableOptions: getTableOptions,
  getOptions: getOptions,
  importXLXS: importXLXS
};
