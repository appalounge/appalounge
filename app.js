var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');

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
	app.use(busboy());
	app.use(cookieParser());
	
	// Authentication check
	app.use(authenticationCheck);
	app.use(express.static(path.join(__dirname, config.server.publicDirectory)));

	app.use('/', require(path.join(__dirname, config.server.routesDirectory, 'index'))(db));
	app.use('/login', require(path.join(__dirname, config.server.routesDirectory, 'login'))(db));
	app.use('/users', require(path.join(__dirname, config.server.routesDirectory, 'users'))(db));
	app.use('/gallery', require(path.join(__dirname, config.server.routesDirectory, 'gallery'))(db));
	app.use('/chat', require(path.join(__dirname, config.server.routesDirectory, 'chat'))(db));
	app.use('/files', require(path.join(__dirname, config.server.routesDirectory, 'files'))(db));
	app.use('/upload', require(path.join(__dirname, config.server.routesDirectory, 'upload'))(db));
	app.use('/remove', require(path.join(__dirname, config.server.routesDirectory, 'remove'))(db));
	app.use('/newfolder', require(path.join(__dirname, config.server.routesDirectory, 'newfolder'))(db));

	app.use('/data/announcements', require(path.join(__dirname, config.server.routesDirectory, 'data/announcements'))(db));
	app.use('/data/session', require(path.join(__dirname, config.server.routesDirectory, 'data/session'))(db));
	app.use('/data/login', require(path.join(__dirname, config.server.routesDirectory, 'data/login'))(db));
	app.use('/data/users', require(path.join(__dirname, config.server.routesDirectory, 'data/users'))(db));
	app.use('/data/gallery', require(path.join(__dirname, config.server.routesDirectory, 'data/gallery'))(db));
	app.use('/data/chat', require(path.join(__dirname, config.server.routesDirectory, 'data/chat'))(db));
	app.use('/data/files', require(path.join(__dirname, config.server.routesDirectory, 'data/files'))(db));
	
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
        var image = pics[index];
        var quote = quotes[index];
        callback(image, quote);
    }

    app.use(function(err, req, res, next) {
    	if (!err.status) {
    		console.error(err);
    		throw err;
    	}
    	getImage(function(image, quote) {
    		if (app.get('env') === 'development') {
    			res.status(err.status || 500);
    			res.render('dylan404', {
    				message: err.message,
    				error: err,
    				image: image,
    				quote: quote
    			});
    		}
    		else {
    			res.status(err.status || 500);
    			res.render('dylan404', {
    				message: err.message,
    				error: {},
    				image: image,
    				quote: quote
    			});
    		}
    	});
    });
    
	return app;

	function authenticationCheck(req, res, next) {
		var restricted = [
		                  '^/files'
		                  ];
		var key = req.query.key;
		// Check for authentication
		var authenticated = false;
		if (key) {
			db.collection(config.db.collections.sessions).findOne({ key: key, ip: req.ip, expiration: { $gt: new Date() } }, function(err, result) {
				if (err) {
					console.error(err.toString());
					res.redirect('/login?required=1&path=' + req.path);
				}
				else {
					if (result) {
						authenticated = true;
					}
					restrict(authenticated, result.username);
				}
			});	
		}
		else {
			restrict(authenticated);
		}
		
		function restrict(authenticated, username) {
			// For use in other routes
			if (authenticated) {
				req.authentication = {
						username: username,
						ip: req.ip
				};
			}
			for (var r = 0; r < restricted.length; r++) {
				if (req.path.match(restricted[r])) {
					if (authenticated) {
						return next();
					}
					else {
						return res.redirect('/login?required=1&path=' + req.path);
					}
				}
			}
			next();
		}
	}

}

module.exports = create;
