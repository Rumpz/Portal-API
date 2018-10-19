const express = require('express');
const router = express.Router();

// const { isLoggedIn } = require('middlewares');
const { fetchMenus } = require('controllers').navbar;

router.get('/menus', fetchMenus);

module.exports = router;
