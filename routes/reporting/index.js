const express = require('express');
const router = express.Router();

// const { isLoggedIn } = require('middlewares');
const { byCategory, byFilter, getReport } = require('controllers').reporting;
const { logger } = require('middlewares');

router.get('/', (req, res, next) => { res.render('pages/reporting'); });
router.get('/byCategory', byCategory);
router.get('/getReport', logger, getReport);
router.get('/byFilter', byFilter);

module.exports = router;
