
function homeUsers (req, res, next) {
  res.send('<h1>get a form for BI exclusive users</h1>');
}

function noLoggers (req, res, next) {
  res.send('<h1>get a form for the noLoggers</h1>');
}

function outsideUsers (req, res, next) {
  res.send('<h1>get a form for the outsiders</h1>');
}

module.exports = {
  homeUsers: homeUsers,
  noLoggers: noLoggers,
  outsideUsers: outsideUsers
};
