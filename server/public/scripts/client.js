$(document).ready(onReady);

function onReady() {
  console.log("In JS");
  refreshTaskList();
  // Click event handler for add new task button
  $("#newTaskButton").on("click", addTask);
  // Click event handler for delete button
  $("#taskOut").on("click", ".deleteButton", deleteTask);
}

// GET Ajax call
function refreshTaskList() {
  console.log("In getTasks");
  $.ajax({
    method: "GET",
    url: "/todo",
  })
    .then((response) => {
      console.log("Receive data back");
      appendTasks(response);
    })
    .catch((err) => {
      console.log("GET tasks failed", err);
    });
}

// POST Ajax call to add task
function addTask() {
  console.log("In addTask POST function");
  // Create object to send to server
  let taskToSend = {
    task: $("#newTaskIn").val(),
    status: "",
  };
  // Ajax POST call
  $.ajax({
    type: "POST",
    url: "/todo",
    data: taskToSend,
  })
    .then(function (response) {
      console.log("Response from server: ", response);
      // Refresh page after addTask is called
      refreshTaskList();
    })
    .catch(function (error) {
      console.log("Error in POST function: ", error);
      alert("Unable to add task");
    });
}

// Function to append to DOM
function appendTasks(listOfTasks) {
  console.log("In appendTasks: ");
  $("#taskOut").empty();
  for (let i = 0; i < listOfTasks.length; i++) {
    let taskObject = listOfTasks[i];
    if (taskObject.status === false) {
      $("#taskOut").append(`
          <tr>
              <td>${taskObject.task}</td>
              <td>No</td>
              <td><button class="completeButton" data-id="${taskObject.id}">Task Completed</button></td>
              <td><button class="deleteButton" data-index=${taskObject.id}>Delete</button></td>
          </tr>
          `);
    } else if (taskObject.status === true) {
      $("#taskOut").append(`
          <tr class="completedTask" data-id="${taskObject.id}">
              <td>${taskObject.task}</td>
              <td>Finished</td>
              <td>DONE!</td>
              <td><button class="deleteButton" data-index=${taskObject.id}>Delete</button></td>
          </tr>
          `);
    }
  }
}

// DELETE Ajax call to delete task
function deleteTask() {
  console.log("in delete task", $(this).data("index"));

  $.ajax({
    type: "DELETE",
    url: "/todo/" + $(this).data("index"),
  })
    .then(function (response) {
      console.log("DELETE ajax call", response);
      refreshTaskList();
    })
    .catch(function (err) {
      console.log("DELETE ajax call error", err);
    });
}
