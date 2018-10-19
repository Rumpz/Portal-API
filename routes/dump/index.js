const express = require('express');
const router = express.Router();
// const {isLoggedIn} = require('middlewares');

router.use('/columns', require('./columns'));

module.exports = router;
