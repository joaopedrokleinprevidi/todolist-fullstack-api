const tasksModel = require("../model/tasksModel");

const getAll = async (_request, response) => {
  const tasks = await tasksModel.getAll();
  response.status(200).json(tasks);
};

module.exports = {
  getAll,
};
