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
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', require('./routes/index')(db));
	app.use('/users', require('./routes/users')(db));
	app.use('/gallery', require('./routes/gallery')(db));
	
	app.use('/data/users', require('./routes/data/users')(db));
	app.use('/data/gallery', require('./routes/data/gallery')(db));

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers

    function getImage(callback) {
		var pics = [
            '/images/dylan/dylan1.jpg',
            '/images/dylan/dylan2.jpg',
            '/images/dylan/dylan3.jpg'
        ];
        var quotes = [
            'However, Dylan is amused by your failure.',
            'Hopefully Dylan can help you find what you are looking for!',
            'Instead, enjoy this picture of a happy Dylan.'
        ];
        var index = ~~(Math.random() * pics.length);
        console.log(index);
        var image = pics[index];
        var quote = quotes[index];
        console.log(image);
        console.log(quote);
        callback(image, quote);
    }
    
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
          getImage(function(image, quote) {
	       res.status(err.status || 500);
              res.render('dylan404', {
                  message: err.message,
                  error: err,
                  image: image,
                  quote: quote
              });
          });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
          getImage(function(image, quote) {
	       res.status(err.status || 500);
              res.render('dylan404', {
                  message: err.message,
                  error: {},
                  image: image,
                  quote: quote
              });
          });
	});

	return app;
}

module.exports = create;
