const express = require("express");
const todoRouter = express.Router();
const pool = require("../modules/pool");

// DB Connectin in modules folder

// GET request
todoRouter.get("/", (req, res) => {
  console.log("In GET route");
  let queryText = `SELECT * FROM tasks;`;
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

// POST route
todoRouter.post("/", (req, res) => {
  let newTask = req.body;
  console.log(`New task added`, newTask);
  let queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
  pool
    .query(queryText, [newTask.task])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`POST request error`, err);
      res.sendStatus(500);
    });
});

// DELETE route
todoRouter.delete("/:index", (req, res) => {
  let queryString = `DELETE FROM "tasks" WHERE "id"=${req.params.index};`;
  pool
    .query(queryString)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
});

// PUT route
todoRouter.put("/:id", (req, res) => {
  console.log("/todo PUT:", req.params.id);
  const queryString = `UPDATE "tasks" SET "status"='true' WHERE id=${req.params.id};`;
  pool
    .query(queryString)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = todoRouter;
