const connection = require('db').connection;
const db = 'portal_reporting';
const reportsTable = 'reports';
const linkedReportsTable = 'linked_reports';

function fetchReports (callback) {
  const sql =
  `SELECT 
    *
  FROM ${reportsTable}`;
  connection(db, sql, callback);
}

function byCategory (category, callback) {
  const sql =
  `SELECT
    reports.id,
    nome,
    descricao,
    quantidade_historico,
    data_lancamento
  FROM ${reportsTable}
  JOIN reports_categorizacoes 
    ON (reports_categorizacoes.id = reports.fk_categorizacao)
  LEFT JOIN linked_reports 
    ON (reports.id = linked_reports.fk_reports)
  WHERE
    reports_categorizacoes.categoria1 = ?;
    
    SELECT
    reports_categorizacoes.categoria2 as 'cat2',
    reports_categorizacoes.categoria3 as 'cat3'
  FROM reports_categorizacoes
  WHERE
    reports_categorizacoes.categoria1 = ?`;
  connection(db, sql, [category, category], callback);
}

function byReportFK (reportID, callback) {
  const sql =
  `SELECT link 
  FROM ${linkedReportsTable}
  WHERE 
    linked_reports.fk_reports = ?`;
  connection(db, sql, reportID, callback);
}

function byFilter (filters, callback) {
  const sql =
  `SELECT 
    reports.id,
    nome,
    descricao,
    quantidade_historico,
    data_lancamento
  FROM reports
    JOIN reports_categorizacoes ON (reports.fk_categorizacao = reports_categorizacoes.id)
  WHERE
    reports_categorizacoes.categoria2 IN (?);`;
  connection(db, sql, [filters], callback);
}

module.exports = {
  fetchReports: fetchReports,
  byCategory: byCategory,
  byReportFK: byReportFK,
  byFilter: byFilter
};
