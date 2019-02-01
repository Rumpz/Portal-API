const formsFindModel = require('models').forms.find;

function tableInfo (database, table, callback) {
  formsFindModel.tableInfo(database, table, (err, rows) => {
    if (err) return callback(err);
    const table = getTable(rows);
    callback(null, table);
  });
}

function findFormByPermission (permission, callback) {
  formsFindModel.byPermission(permission, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

function findFieldsByProcedure (database, sql, callback) {
  formsFindModel.byProcedure(database, sql, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function byGroup (formIDs, callback) {
  const ids = formIDs.split(',');
  formsFindModel.byGroup(ids, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function formByID (formID, callback) {
  const dataToSend = [];
  formsFindModel.byID(formID, (err, rows) => {
    if (err) return callback(err);
    const {maquina, tabela_dados, proc_antes} = rows[0];
    formsFindModel.fieldsData(maquina, tabela_dados, (err, vals) => {
      if (err) return callback(err);
      let formHeader = adjustFormHeader(rows);
      let fields = getFields(rows);
      let table = getTable(vals);
      if (formHeader.proc_antes) {
        // Check first procedure
        formsFindModel.byProcedure(maquina, proc_antes, (err, result) => {
          if (err) return callback(err);
          result = result[0][0]; // get info from query result
          formHeader.proc_antes = result; // proc_antes is now the is own result
          dataToSend.push({header: formHeader, fields: fields, table}); // form header = arr[0], fields = arr[1]
          callback(null, dataToSend);
        });
      } else {
        dataToSend.push({header: formHeader, fields: fields, table}); // No procedure
        callback(null, dataToSend);
      }
    });
  });
}

function adjustFormHeader (data) {
  return {
    maquina: data[0].maquina,
    mensagem: data[0].mensagem,
    proc_antes: data[0].proc_antes,
    proc_depois: data[0].proc_depois,
    tabela_dados: data[0].tabela_dados,
    nome_form: data[0].nome_form
  };
}

function getFields (data, values) {
  const fields = data.map((el, index) => {
    return {
      [el.campo]: {
        label: el.label,
        detail: el.detail,
        modal: el.modal,
        editable: el.editable,
        table: el.table,
        modalOrder: el.modalOrder,
        detailOrder: el.detailOrder,
        tableOrder: el.tableOrder,
        tipo: el.tipo,
        selectOPT: el.select_opt,
        placeholder: el.placeholder
      }
    };
  });
  return fields;
}

function getTable (values) {
  const newVals = values.map((e) => {
    delete e['updatedBy'];
    delete e['lastUpdate'];
    return e;
  });
  return newVals;
}

module.exports = {
  findFormByPermission: findFormByPermission,
  findFieldsByProcedure: findFieldsByProcedure,
  byGroup: byGroup,
  formByID: formByID,
  tableInfo: tableInfo
};
