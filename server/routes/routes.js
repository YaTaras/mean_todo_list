// using Todo model
var Todo = require('../models/todoModel');

// api routes
module.exports = function (app) {
	//get all tasks
	app.get('/api/todolist', function (req, res) {
		Todo.find(function (err, todolist) {
			if(err)
				res.send(err);
			res.json(todolist);
		});
	});

	// get one by id
	app.get('/api/todolist/:todo_id', function (req, res) {		
		Todo.findOne( { _id: req.params.todo_id }, function (err, todo) {
			if(err)
				res.send(err);
			console.log("Find by id: " + todo);
			res.json(todo);
		});
	});

	// create task
	app.post('/api/todolist', function (req, res) {
		Todo.create({
			text : req.body.text,
			done : false
		}, function (err, todo) {
			if (err)
				res.send(err);
			console.log(todo + ' created successfully.');
			Todo.find(function (err, todolist) {
				if(err)
					res.send(err);
				res.json(todolist);
			});
		});
	});

	// update task
	app.put('/api/todolist/:todo_id', function (req, res) {
		console.log("The task was changed to: " +  req.body.text);
		
		Todo.findOne( { _id: req.params.todo_id }, function (err, todo) {
			todo.text = req.body.text;
			todo.save( function (err) {
				if(err)
					res.send(err);
			});

			Todo.find(function (req, todolist) {
				if(err)
					res.send(err);
				res.json(todolist);
			});
		});
	});

	// delete task
	app.delete('/api/todolist/:todo_id', function (req, res) {
		Todo.remove({ _id : req.params.todo_id }, function (err, todo) {
			if(err)
				res.send(err);

			Todo.find(function (req, todolist) {
				if(err)
					res.send(err);
				res.json(todolist);
			});
		});
	});

	// rendering main page
	app.get('/', function (req, res) {
	  res.render('index', { title: 'Todo list'});
	});
};