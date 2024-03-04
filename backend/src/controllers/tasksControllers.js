const tasksModel = require("../model/tasksModel");

const getAll = async (_request, response) => {
  try {
    const tasks = await tasksModel.getAll();
    response.status(200).json(tasks);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(request.body);
  return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;
  await tasksModel.deleteTask(id);
  return response.status(204).json({ message: "Tarefa deletada com sucesso." });
};

const updateTask = async (request, response) => {
  const { id } = request.params;
  await tasksModel.updateTask(id, request.body);
  return response
    .status(204)
    .json({ message: "Tarefa atualizada com sucesso" });
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
