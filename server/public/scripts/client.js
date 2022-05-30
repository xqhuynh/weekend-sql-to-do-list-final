$(document).ready(onReady);

function onReady() {
  console.log("In JS");
  // GET task list as soon as page loads
  refreshTaskList();
  // Click event handler for add new task button
  $("#newTaskButton").on("click", addTask);
  // Click event handler for delete task button
  $("#taskOut").on("click", ".deleteButton", deleteTask);
  // CLick event handler for complete task button
  $("#taskOut").on("click", ".completeButton", completeTask);
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
    .then((response) => {
      console.log("Response from server: ", response);
      // Refresh page after addTask is called
      refreshTaskList();
      // Clear add task input after user clicks add button
      $("#newTaskIn").val("");
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
              <td><button class="completeButton" data-id="${taskObject.id}">Mark Task Completed</button></td>
              <td><button class="deleteButton" data-index=${taskObject.id}>❌</button></td>
          </tr>
          `);
    } else if (taskObject.status === true) {
      $("#taskOut").append(`
          <tr class="completedTask" data-id="${taskObject.id}">
              <td>${taskObject.task}</td>
              <td>Yes</td>
              <td>Completed</td>
              <td><button class="deleteButton" data-index=${taskObject.id}>❌</button></td>
          </tr>
          `);
    }
  }
}

// DELETE Ajax call to delete task
function deleteTask() {
  console.log("in deleteTask DELETE ajax call");

  $.ajax({
    type: "DELETE",
    url: "/todo/" + $(this).data("index"),
  })
    .then((response) => {
      console.log("DELETE ajax call successful", response);
      refreshTaskList();
    })
    .catch(function (err) {
      console.log("DELETE ajax call error", err);
    });
}

// PUT Ajax call to update task as completed
function completeTask() {
  console.log("in complete task", $(this).data("id"));
  let id = $(this).data("id");
  $.ajax({
    type: "PUT",
    url: "/todo/" + id,
  })
    .then((response) => {
      console.log("PUT ajax call successful", response);
      refreshTaskList();
    })
    .catch(function (err) {
      console.log("PUT ajax call failed", err);
    });
}
