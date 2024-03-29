import myFunctions from "./dom.js";
const bodyOfTable = document.querySelector("tbody");
const taskInput = document.querySelector("#inputTask");
const buttonCreateTask = document.querySelector("#sendTask");
const errorContainer = document.querySelector("#errorContainer");

const enderecoAPI = "http://localhost:3000/tasks";

const getAllTasksOfDataBase = async () => {
  const allTasks = await fetch(enderecoAPI);
  const jsonAllTasks = await allTasks.json();

  return jsonAllTasks;
};

const loadAllTasksInDisplay = async () => {
  const tasks = await getAllTasksOfDataBase();

  bodyOfTable.innerHTML = "";

  tasks.forEach((task) => {
    const row = myFunctions.createRows(task);
    bodyOfTable.appendChild(row);
  });
};

const createTask = async (event) => {
  event.preventDefault();

  const nome = taskInput.value;
  const status = "Pendente";

  await fetch(enderecoAPI, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, status }),
  })
    .then(async (response) => {
      if (response.ok) {
        return;
      } else {
        const errorJson = await response.json();
        console.log(errorJson);
        throw new Error(errorJson || "Erro desconhecido");
      }
    })
    .catch((error) => {
      console.error("Erro ao solicitar a requisição: ", error.message);
      showErrorForUserCausedByMiddlewares(error.message);
    });

  taskInput.value = "";
  loadAllTasksInDisplay();
};

const updateTask = async (task) => {
  const { id, nome, status } = task;

  await fetch(`${enderecoAPI}/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, status }),
  });
  console.log("update task rodou direito");

  loadAllTasksInDisplay();
};

const deleteTask = async (id) => {
  await fetch(`${enderecoAPI}/${id}`, {
    method: "delete",
  });

  loadAllTasksInDisplay();
};

function showErrorForUserCausedByMiddlewares(error) {
  errorContainer.innerHTML = `<h1><span class="error-message">Erro</span>: <span class="color-effect">${error}</span> </h1>`;

  setTimeout(() => {
    errorContainer.innerHTML = "";
  }, 5000);
}

buttonCreateTask.addEventListener("click", createTask);

loadAllTasksInDisplay();

const myFunctionsIndex = {
  deleteTask,
  updateTask,
};
export default myFunctionsIndex;
