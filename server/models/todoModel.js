// using mongoose module
var mongoose = require('mongoose');

// defining todo model
module.exports = mongoose.model('Todo', {
	text : String,
	done: Boolean
});