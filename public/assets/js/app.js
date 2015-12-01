var app = angular.module('todoApp', ['ngRoute','ngAnimate', 'ui.bootstrap']);

app.controller('mainController', mainController);

function mainController ($scope, $http, $route, $routeParams) {
	$scope.formData = {};
	$scope.todo = {};
    $scope.clickedTask = [];

    // clear input field after "ESC"
    $scope.clearInput = function(keyEvent, inputName) {
        if(keyEvent.which === 27) {
            if(inputName === 'newTaskInput')
                $scope.formData.text = '';
            if(inputName === 'searchInput')
                $scope.search = '';
        }
    }

    // toggle additional buttons
    $scope.clickingTask = function (index) {
        $scope.clickedTask[index] = true;
    };

    // get all tasks
	$http.get('/api/todolist')
		.success(function (data) {
			$scope.todolist = data;
		})
		.error(function (data) {
			console.log('Error: ' + data);
		});

	// create new task
    $scope.createTodo = function() {
        $http.post('/api/todolist', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todolist = data;
                console.log('Creared task: ' + JSON.stringify(data[data.length-1]));
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // update task
    $scope.updateTodo = function (id, newtext, index) {
    	var obj = {text: newtext, done: false};
    	$http.put('/api/todolist/' + id, obj)
    		.success(function(data) {
    			$scope.todo = obj;
                console.log('Updated task: ' + data);
                $scope.clickedTask[index] = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // cancel updating task
    $scope.cancelUpdateTodo = function (id, index) {
        var obj = {};
        $http.get('/api/todolist/' + id, obj)
            .success(function(data) {
                $scope.todolist[index].text = data.text;
                console.log('Cancel updating task: ' + data.text);
                $scope.clickedTask[index] = false;
            })
            .error( function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete task
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todolist/' + id)
            .success(function(data) {
                $scope.todolist = data;
                console.log('Deleted task: ' + data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}