const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const todoRouter = require("./routes/todo.router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));

// Route
app.use("/todo", todoRouter);

// Start listening for requests on port 5000
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
