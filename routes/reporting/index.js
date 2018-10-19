const express = require('express');
const router = express.Router();

// const { isLoggedIn } = require('middlewares');
const { init, byCategory, byFilter, getReport } = require('controllers').reporting;

router.get('/', init);
router.get('/byCategory', byCategory);
router.get('/getReport', getReport);
router.get('/byFilter', byFilter);

module.exports = router;
