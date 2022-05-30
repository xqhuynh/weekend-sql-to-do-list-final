const express = require("express");
const todoRouter = express.Router();
const pool = require("../modules/pool");

// DB Connectin in modules folder

// GET request
todoRouter.get("/", (req, res) => {
  console.log("In GET route");
  let queryText = `SELECT * FROM todo;`;
  pool
    .query(queryText)
    .then((result) => {
      // Sends back results to object
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error getting tasks", err);
      res.sendStatus(500);
    });
});

module.exports = todoRouter;
