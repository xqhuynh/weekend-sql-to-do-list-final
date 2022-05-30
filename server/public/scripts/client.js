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
      displayTasks(response);
    })
    .catch((err) => {
      console.log("GET tasks failed", err);
    });
}

function displayTasks(tasks) {
  $(".viewTasks").empty();

  for (let task of tasks)
    $(".viewTasks").append(`
        <ul>
          ${task.task}
        </ul>
    `);
}
