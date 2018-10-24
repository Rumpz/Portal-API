const routes = require('../routes');

module.exports = (app) => {
  // Reporting Route
  app.use('/reporting', routes.reporting);
  // Dump Route
  app.use('/dump', routes.dump);
  // Navbar Route
  app.use('/navbar', routes.navbar);
};
