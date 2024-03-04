const connection = require("./connection");

const getAll = async () => {
  const tasks = await connection.execute("SELECT * FROM tasks");
  return tasks[0];
};

const createTask = async (tasks) => {
  const { nome } = tasks;

  const query = "INSERT INTO tasks(nome, status) VALUES(?, ?)";

  const [createdTask] = await connection.execute(query, [nome, "Pendente"]);
  return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
  const query = "DELETE FROM tasks WHERE id = ?";
  const removedTask = await connection.execute(query, [id]);
  return removedTask;
};

const updateTask = async (id, task) => {
  const { nome, status } = task;
  const query = "UPDATE tasks SET nome = ?, status = ? WHERE id = ?";
  const [updatedTask] = await connection.execute(query, [nome, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
