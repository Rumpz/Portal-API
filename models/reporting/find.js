const connection = require('db').connection;
const db = 'portal_reporting';
const reportsTable = 'portal_reporting.reports';
const linkedReportsTable = 'portal_reporting.linked_reports';

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
  JOIN portal_reporting.reports_categorizacoes 
    ON (portal_reporting.reports_categorizacoes.id = portal_reporting.reports.fk_categorizacao)
  LEFT JOIN portal_reporting.linked_reports 
    ON (portal_reporting.reports.id = portal_reporting.linked_reports.fk_reports)
  WHERE
    portal_reporting.reports_categorizacoes.categoria1 = ?;
    
    SELECT
    portal_reporting.reports_categorizacoes.categoria2 as 'cat2',
    portal_reporting.reports_categorizacoes.categoria3 as 'cat3'
  FROM portal_reporting.reports_categorizacoes
  WHERE
    portal_reporting.reports_categorizacoes.categoria1 = ?`;
  connection(db, sql, [category, category], callback);
}

function byReportFK (reportID, callback) {
  const sql =
  `SELECT link 
  FROM ${linkedReportsTable}
  WHERE 
    portal_reporting.linked_reports.fk_reports = ?`;
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
  FROM ${reportsTable}
    JOIN portal_reporting.reports_categorizacoes ON (reports.fk_categorizacao = portal_reporting.reports_categorizacoes.id)
  WHERE
    portal_reporting.reports_categorizacoes.categoria2 IN (?);`;
  connection(db, sql, [filters], callback);
}

module.exports = {
  fetchReports: fetchReports,
  byCategory: byCategory,
  byReportFK: byReportFK,
  byFilter: byFilter
};
