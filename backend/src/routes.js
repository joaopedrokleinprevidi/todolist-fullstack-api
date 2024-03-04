const express = require("express");
const router = express.Router();

const tasksController = require("./controllers/tasksControllers");
const tasksMiddleware = require("./middlewares/tasksMiddlewares");

router.get("/tasks", tasksController.getAll);

router.post("/tasks", tasksMiddleware.validateName, tasksController.createTask);

router.delete("/tasks/:id", tasksController.deleteTask);

router.put(
  "/tasks/:id",
  tasksMiddleware.validateName,
  tasksController.updateTask
);

module.exports = router;
