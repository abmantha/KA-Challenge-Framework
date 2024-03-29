var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/index');

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* static public directory */
app.use(express.static(path.join(__dirname, 'public')));

/* set up routes */
app.use( '/', routes ); 

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* error handlers */

/* development error handler will print stacktrace */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/* production error handler no stacktraces leaked to user */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
