const FINDCONTROLLER = require('./find');

function init (req, res, next) {
  res.send('mainPage initialized');
}

function getGraphic (req, res, next) {
  const { page } = req.query;
  FINDCONTROLLER.graphic(page, (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.length) return res.status(404).json('Not Found');
    res.status(200).json(result);
  });
}

function options (req, res, next) {
  FINDCONTROLLER.options((err, options) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(options);
  });
}

module.exports = {
  init: init,
  getGraphic: getGraphic,
  options: options
};
