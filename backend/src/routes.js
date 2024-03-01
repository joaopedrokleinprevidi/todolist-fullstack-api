const express = require("express");
const router = express.Router();
const app = express();

const tasksController = require("./controllers/tasksControllers");

app.get("/tasks", tasksController.getAll);

module.exports = router;
