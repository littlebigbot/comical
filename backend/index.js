#!/usr/bin/env nodejs

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');
var cors = require('cors')

var credentials = require('./credentials.json');

var index = require('./routes/index');
var comics = require('./routes/comics');

var app = express();

// view engine setup
app.set('views', path.resolve(__dirname, '../static'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(express.static(path.resolve(__dirname, '../static')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//Database connection
app.use(function(req, res, next){
  global.connection = mysql.createConnection({
    user     : credentials.username,
    password : credentials.password,
    host     : 'localhost',
    database : 'comical',
    multipleStatements: true
  });
  connection.connect();
  next();
});

// app.use('/', index);
app.use('/api/v1/comics', cors(), comics);

app.use("*", function(req, resp) {
  console.log(path.resolve(__dirname + '../../static/index.html'));
  resp.sendFile(path.resolve(__dirname + '../../static/index.html'));
});

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

module.exports = app;
var server = http.createServer(app);
server.listen(1337);
