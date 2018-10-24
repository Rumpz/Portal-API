const express = require('express');
const router = express.Router();
// const {isLoggedIn} = require('middlewares');

router.get('/', (req, res, next) => { res.render('pages/dump'); });
router.use('/columns', require('./columns'));

module.exports = router;
