var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

function create(db) {

	var app = express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, config.server.publicDirectory)));

	app.use('/', require(path.join(__dirname, config.server.routesDirectory, 'index'))(db));
	app.use('/users', require(path.join(__dirname, config.server.routesDirectory, 'users'))(db));
	app.use('/gallery', require(path.join(__dirname, config.server.routesDirectory, 'gallery'))(db));
	app.use('/uploads', require(path.join(__dirname, config.server.routesDirectory, 'uploads'))(db));

	app.use('/data/users', require(path.join(__dirname, config.server.routesDirectory, 'data/users'))(db));
	app.use('/data/gallery', require(path.join(__dirname, config.server.routesDirectory, 'data/gallery'))(db));
	app.use('/data/uploads', require(path.join(__dirname, config.server.routesDirectory, 'data/uploads'))(db));
	
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
		var pics = [
            '/images/dylan/ajsndkajnsd.jpg',
            '....'
        ];
        var quotes = [

        ];
        var index = Math.random() * pics.length;
        var path = pics[index];
	    res.render('dylan404', {
	      message: err.message,
	      error: err,
          image: path
	    });
	  });
	}
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

	return app;
}

module.exports = create;
