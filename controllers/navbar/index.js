const navbarFindModel = require('models').navbar.find;

function fetchMenus (req, res, next) {
  const noPermission = {
    name: 'SEM ACESSO',
    link: '/forms',
    permission: ''
  };
  let permission = '';
  if (process.env.NODE_ENV === 'Production') {
    permission = !req.user ? 'noLog' : req.user.group_permission;
  } else {
    permission = 'BI';
  }
  navbarFindModel.menus(permission, (err, menus) => {
    if (err) return res.status(500).json(err);
    if (!menus.length) return res.status(404).json(noPermission);
    res.status(200).json(menus);
  });
}

module.exports = {
  fetchMenus: fetchMenus
};
