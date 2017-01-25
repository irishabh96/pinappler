angular.module("todolist",[])
.controller('maincntrl',function(){
	var todolist = this;
	todolist.todo = [];

	todolist.addTodo = function(){
		todolist.todo.push({test:todolist.todoText, done:false})
	};
	todolist.remaining = function(){
		var count = 0;
		angular.forEach(todolist.todo,function(todo){
			count += todo.done ? 0 : 1;
		});
		return count;
	}
});