function Tasks() {
  fetch('/tasks')
  .then(function(response) {
    return response.json();
  })
  .then(function(tasks) {
    
    var html = '';
    tasks.sort(function compare(a, b) {
	  var dateA = new Date(a.date);
	  var dateB = new Date(b.date);
	  return dateA - dateB;
	});

    for (var i = 0, len = tasks.length; i < len; i++) {
      var task = tasks[i];

      var del = '<input type=button  value=delete onclick="destroyTask(\'' + task._id + '\')">';
     // var edit='<button onclick="destroyTask(\'' + task._id + '\')">edit</button>';
      html += '<li>' + task.name + ' '+task.date+' ' + del + '</li>';
    }
    document.getElementById('taskContainer').innerHTML = html;

  });
};

function destroyTask(id) {
  fetch('tasks' , {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'id':id})
  })
  .then(Tasks);
}

document.getElementById('send_button').addEventListener("click", function(){

  var task = document.getElementById('addtask').value;
  var date = document.getElementById('date').value;

if(task&&date){
	  fetch('/tasks', {
	    method: 'post',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({ 'task': task,'date':date })
	  })
	  .then(Tasks);

	  	return false;
	  ;
	}
})
Tasks();
