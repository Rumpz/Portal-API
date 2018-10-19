const navbarFindModel = require('models').navbar.find;

function fetchMenus (req, res, next) {
  navbarFindModel.menus((err, menus) => {
    if (err) return res.status(500).json(err);
    if (!menus.length) return res.status(404).json('Not Found');
    res.status(200).json(menus);
  });
}

module.exports = {
  fetchMenus: fetchMenus
};
