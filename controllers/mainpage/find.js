const async = require('async');
const mainPageFindModel = require('models').mainpage.find;

function graphic (values, callback) {
  mainPageFindModel.graphic(values, (err, rows) => {
    if (err) return callback(err);
    if (!rows.length) return callback(null, rows);
    const tasks = [
      async.constant(rows),
      getConfig,
      adjustGraphic
    ];
    async.waterfall(tasks, end);
    function end (err, results) {
      if (err) return callback(err);
      callback(null, results);
    }
  });
}

function getConfig (params, next) {
  let flag = [];
  let database = params.map(e => e.maquina);
  params.setup = params.map(e => e.dados);
  params.setup.forEach((element, index) => {
    mainPageFindModel.graphicData(database[index], element, (err, rows) => {
      if (err) return next(err);
      flag.push(rows);
      params[index].data = rows;
      if (flag.length === params.setup.length) {
        next(null, params);
      }
    });
  });
}

function adjustGraphic (params, next) {
  params.dataToRender = params.map((e, index) => {
    return {
      type: e['tipo_grafico'],
      title: e['titulo_grafico'],
      data: e.data,
      cores: e.cores,
      axis: e.axis,
      domain: e.domain,
      pagina: e.pagina,
      order: e.ordem
    };
  });
  if (params.dataToRender.length === params.length) {
    next(null, params.dataToRender);
  }
}

function options (callback) {
  mainPageFindModel.options((err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = {
  graphic: graphic,
  options: options
};
