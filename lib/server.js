/* const REQUESTTIMEOUT = 1000 * 60 * 5; */
const path = require('path');
require('app-module-path').addPath(path.join(__dirname, '../'));
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const server = require('http').createServer(app);

const json2xls = require('json2xls');
/*
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const busboy = require('connect-busboy');

const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(require('config/dbconfig.json'));
const io = require('sockets')(server);
 */

module.exports = () => {
  /* var opts = {
    filter: '(objectclass=commonobject)',
    scope: 'sub',
    paged: true,
    sizeLimit: 200
  };

  client.search('o=largedir', opts, function(err, res) {
    assert.ifError(err);
    res.on('searchEntry', function(entry) {
      // do per-entry processing
    });
    res.on('page', function(result) {
      console.log('page end');
    });
    res.on('error', function(resErr) {
      assert.ifError(resErr);
    });
    res.on('end', function(result) {
      console.log('done ');
    });
  }); */
  // process.env.NODE_ENV = 'test';
  // require('config/passport')(passport); // pass passport for configuration
  // set up our express application
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev')); // log every request to the console
  }
  /* server.setTimeout(REQUESTTIMEOUT); */

  // GET MainPage on log
  app.get('/', (req, res, next) => {
    res.render('pages/mainPage');
  });

  app.use(cors());
  app.use(json2xls.middleware);

  // app.use(busboy());
  // ------------------------------------------> app.use(json2xls.middleware);
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.set('view engine', 'ejs'); // set up ejs for templating
  app.use(express.static('public'));
  // required for passport
  /* app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session
 */
  // routes ======================================================================
  require('config/routes.js')(app); // load our routes and pass in our app and fully configured passport

  return server;
};
