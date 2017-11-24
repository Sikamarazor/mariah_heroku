var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var person = require('./routes/person');
var user = require('./routes/user');
var trash = require('./routes/trash');
var sent = require('./routes/sent-mail');
var recipient = require('./routes/recipient');
var message = require('./routes/message');
var inbox = require('./routes/inbox');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/person', person);
app.use('/user', user);
app.use('/trash', trash);
app.use('/sent', sent);
app.use('/recipient', recipient);
app.use('/message', message);
app.use('/inbox', inbox);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

//Use native Node promise
mongoose.Promise = global.Promise;

// connect to MongoDB
var conn = mongoose.connect('mongodb://localhost/email')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

module.exports = app;
