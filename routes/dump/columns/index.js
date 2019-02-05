const express = require('express');
const router = express.Router();

// const { isLoggedIn } = require('middlewares');
const { columnsByID, getOptions, exportXLS } = require('controllers').dump.columns;

// proxy setting
const proxy = require('express-http-proxy');
const getPath = req => require('url').parse(req.url).path;
const createProxy = ({hostname = 'localhost', port = 8080, path = ''}) =>
  proxy(`${hostname}:${port}`, {proxyReqPathResolver: req => `${path}${getPath(req)}`});
/****************************************************************************************/

const { logger } = require('middlewares');
router.get('/options', getOptions);
router.get('/columnsByID', columnsByID);
router.get('/exportXLS', logger, createProxy({port: 7000, path: '/dump/columns'}));

module.exports = router;
