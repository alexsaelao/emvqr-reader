const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const logDirectory = require('./utility/logger')


var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set('trust proxy', true);

logger.token('date', function (req, res) {
  let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  return (date);
});

logger.token('ips', function (req, res) {
  let ips = req.ip
  ips.substr(0, 7) === '::ffff:' ? ips = ips.substr(7) : ips = ips
  return (ips);
});

logger.format('logFormat', ':date - HTTP REQUEST FROM - http://:ips - :method :url - :response-time ms - ":user-agent"');
// app.use(logger('logFormat', { stream: logDirectory.logDir() }));
app.use(logger('logFormat'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
