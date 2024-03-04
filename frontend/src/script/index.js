const dom = require("./dom");
const bodyOfTable = document.querySelector("tbody");

const enderecoAPI = "http://localhost:3000/tasks";

const getAllTasksOfDataBase = async () => {
  const allTasks = await fetch(enderecoAPI);
  const jsonAllTasks = await allTasks.json();

  return jsonAllTasks;
};

const loadAllTasksInDisplay = async () => {
  const tasks = await getAllTasksOfDataBase();

  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const row = dom.createRows(task);
    bodyOfTable.appendChild(row);
  });
};

loadAllTasksInDisplay();
