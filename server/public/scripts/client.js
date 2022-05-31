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
  console.log("In refreshTaskList");
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
  // Empty task list
  $("#taskOut").empty();
  // Loop through task items
  for (let i = 0; i < listOfTasks.length; i++) {
    // Set variables to hold index of listOfTasks (listOfTask[i])
    let taskObject = listOfTasks[i];
    // If task status is false (is set to false by default in SQL query)
    if (taskObject.status === false) {
      $("#taskOut").append(`
          <tr>
              <td>${taskObject.task}</td>
              <td><button class="completeButton" data-id="${taskObject.id}">Complete</button></td>
              <td><button class="deleteButton" data-index=${taskObject.id}>Delete</button></td>
          </tr>
          `);
      // If task status is set to true
    } else if (taskObject.status === true) {
      // jquery addClass method to strike through text after mark complete button clicked
      // Target completeTaskToggle class
      $("#taskOut").append(`
          <tr class="completedTask" data-id="${taskObject.id}">
              <td class="completeTaskToggle">${taskObject.task}</td>
              <td >Done</td>
              <td><button class="deleteButton" data-index=${taskObject.id}>Delete</button></td>
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
    // Refresh data after deleteTask()
      refreshTaskList();
    })
    .catch(function (err) {
      console.log("DELETE ajax call error", err);
    });
}

// PUT Ajax call to update task as completed
function completeTask() {
  console.log("In completeTask ajax PUT call");
  // User $(this) to target task ID
  let id = $(this).data("id");
  $.ajax({
    type: "PUT",
    url: "/todo/" + id,
  })
    .then((response) => {
      console.log("PUT ajax call successful", response);
    // Refresh data after completeTask()
      refreshTaskList();
    })
    .catch(function (err) {
      console.log("PUT ajax call failed", err);
    });
}
