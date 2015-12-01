
var express = require('express')
	, app = express()
	, mongoose = require('mongoose')
	, db = require('./server/config/db')
	, methodOverride = require('method-override')
	, bodyParser = require('body-parser')
	, Todo = require('./server/models/todoModel')
	, logger = require('morgan')
	, loggerOptions = require('./server/config/logoptions')
	, favicon = require('serve-favicon');

// connecting to db
mongoose.connect(db.url, function (err) {
	if(err)
		console.log('Error with connecting to DB! : ' + err);
	else
		console.log('Connected to DB.');
});

// configuration of server
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ 'extended' : 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));
app.use(logger('dev', loggerOptions));
app.use(methodOverride());
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

// use jade view engine
app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');

// using api routes
require('./server/routes/routes')(app);

// listening application
app.listen(8888);
console.log("Application is listening on port 8888");