const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { getOptions, uploadFile, getAvailables } = require('controllers').listagens;

// proxy setting
const proxy = require('express-http-proxy');
const getPath = req => require('url').parse(req.url).path;
const createProxy = ({hostname = 'localhost', port = 8080, path = ''}) =>
  proxy(`${hostname}:${port}`, {proxyReqPathResolver: req => `${path}${getPath(req)}`});
/****************************************************************************************/

router.get('/', (req, res, next) => { res.render('pages/listagens'); });
router.get('/getAvailables', getAvailables);
router.get('/getOptions', getOptions);
router.post('/upload', upload.none(), uploadFile);
router.get('/exportXLS', createProxy({port: 7000, path: '/listagens'}));

module.exports = router;
