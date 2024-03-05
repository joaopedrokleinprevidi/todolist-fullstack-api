import myFunctionsIndex from "./index.js";

const createElements = (
  tag,
  className = "",
  innerText = "",
  innerHTML = ""
) => {
  const element = document.createElement(tag);

  if (className != "") {
    element.classList.add(className);
  }

  if (innerText != "") {
    element.innerText = innerText;
  }

  if (innerHTML != "") {
    element.innerHTML = innerHTML;
  }

  return element;
};

const createSelectsInputs = (value) => {
  const options = `
    <option value="Pendente">Pendente</option>
    <option value="Em andamento">Em andamento</option>
    <option value="Concluída">Concluída</option>
    `;

  const select = createElements("select", "", "Pendente", options);

  select.value = value;
  return select;
};

function createEditInput(TitleTask_TD, id, nome, status) {
  //Criando elementos para fazer edição
  const form = createElements("form");
  const editInput = createElements("input");

  //Atribuindo valor atual ao input de edição
  editInput.value = nome;

  //Atribuindo elemento de edição criado ao local do Nome na tabela
  form.append(editInput);
  TitleTask_TD.innerText = "";
  TitleTask_TD.append(form);

  //Atribuindo evento submit ao form, para realizar edições
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    myFunctionsIndex.updateTask({ id, nome: editInput.value, status });
  });
}

const createRows = (task) => {
  const { id, nome, status } = task;

  //Criação de elementos HTML
  const Row_TR = createElements("tr");
  const TitleTask_TD = createElements("td", "", nome);
  const SelectStatus_TD = createElements("td");
  const ButtonsForActionsOfUser_TD = createElements("td");

  const editTaskButton = createElements(
    "button",
    "action-buttons",
    "",
    "<span class='material-symbols-outlined'> edit </span>"
  );

  const removeTaskButton = createElements(
    "button",
    "action-buttons",
    "",
    "<span class='material-symbols-outlined'> delete </span>"
  );

  const newSelect = createSelectsInputs(status);
  //Criando evento no input Select
  newSelect.addEventListener("change", ({ target }) => {
    myFunctionsIndex.updateTask({ ...task, status: target.value });
  });

  //Atribuindo eventos aos botões
  removeTaskButton.addEventListener("click", () => {
    myFunctionsIndex.deleteTask(id);
  });
  editTaskButton.addEventListener("click", () => {
    createEditInput(TitleTask_TD, id, nome, status);
  });

  //Posicionando os elementos criados
  ButtonsForActionsOfUser_TD.append(editTaskButton, removeTaskButton);
  SelectStatus_TD.append(newSelect);

  Row_TR.append(TitleTask_TD, SelectStatus_TD, ButtonsForActionsOfUser_TD);

  return Row_TR;
};

const myFunctions = {
  createElements,
  createRows,
  createSelectsInputs,
};

export default myFunctions;
