$(document).ready(onReady);

function onReady() {
  console.log("In JS");
  getTasks();
}

// GET Ajax call
function getTasks() {
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
