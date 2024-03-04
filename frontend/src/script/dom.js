const createElements = (
  tag,
  classElement = "",
  innerText = "",
  innerHTML = ""
) => {
  const element = document.createElement(tag);

  if (!classElement == "") {
    element.classList.add(`${classElement}`);
  }

  if (!innerText == "") {
    element.innerText = innerText;
  }

  if (!innerHTML == "") {
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

  const select = createElements("select", "", options, "");

  select.value = value;

  return select;
};

const createRows = (task) => {
  const { id, nome, status } = task;

  //Criação de elementos HTML
  const Row_TR = createElements("tr");
  const TitleTask_TD = createElements("td", nome);
  const SelectStatus_TD = createElements("td");
  const ButtonsForActionsOfUser_TD = createElements("td");

  const removeTaskButton = createElements(
    `<button class="action-buttons"> <span class="material-symbols-outlined"> edit </span> </button>`
  );
  const editTaskButton = createElements(
    `<button class="action-buttons"> <span class="material-symbols-outlined"> delete </span> </button>`
  );

  const newSelect = createSelectsInputs(status);

  //Posicionando elementos criados
  ButtonsForActionsOfUser_TD.append(removeTaskButton, editTaskButton);
  SelectStatus_TD.append(newSelect);

  Row_TR.append(TitleTask_TD, SelectStatus_TD, ButtonsForActionsOfUser_TD);

  return Row_TR;
};

module.exports = {
  createElements,
  createSelectsInputs,
  createRows,
};
