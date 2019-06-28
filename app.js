const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const helpers = require('./helpers/helper');

require('./models/Projects');
require('./models/Tasks');
require('./models/Users');

const routes = require('./routes');
const db = require('./config/db');
db.sync()
    .then( () => {
      console.log('Conectado OK a la base de datos.')
    })
    .catch(error => console.log(error));

const app = express();

global._constants = require('./config/constants');

app.use(expressValidator());
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // con res.locals.vardump lo que hacemos es que se pueda acceder a vardump en cualquier archivo de la aplicacion
    res.locals.vardump = helpers.vardump;
    // Siguiente middleware es como un continue o break
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
