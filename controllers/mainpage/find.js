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
  let dataFlag = 0;
  let database = params.map(e => e.maquina);
  params.setup = params.map(e => e.dados);
  /* params.resumos = params.map(e => e.resumo); */
  params.setup.forEach((element, index) => {
    mainPageFindModel.graphicData(database[index], element, (err, rows) => {
      let procedure = element.charAt(0).concat(element.charAt(1)).concat(element.charAt(2));
      if (procedure === 'cal') { rows = rows[0]; }
      if (err) return next(err);
      dataFlag++;
      if (Array.isArray(rows)) {
        params[index].data = rows;
      }
      /* params.resumos.forEach((element, index) => {
        !element
          ? params[index].resumos = null
          : mainPageFindModel.resumosData(database[index], element, (err, rows) => {
            if (err) return next(err);
            params[index].resumo = rows;
          });
      }); */
      if (dataFlag === params.setup.length) {
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
      order: e.ordem/* ,
      resumo: e.resumo */
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
