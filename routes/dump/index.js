const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => { res.render('pages/dump'); });
router.use('/columns', require('./columns'));
router.use('/procedure', require('./procedure'));

module.exports = router;
