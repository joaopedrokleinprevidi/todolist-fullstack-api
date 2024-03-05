const validateName = (request, response, next) => {
  const { body } = request;

  let errorMessage = "";

  if (body.nome == "") {
    errorMessage = 'O campo "Tarefa" não pode ser vazio.';
  }

  if (body.nome == undefined) {
    errorMessage = 'O campo "Tarefa" deve conter algum valor. ';
  }

  if (body.nome.length <= 3) {
    errorMessage = 'O campo "Tarefa" deve conter no mínimo 4 caracteres.';
  }

  if (body.nome.length >= 50) {
    errorMessage = 'O campo "Tarefa" deve conter no máximo 50 caracteres.';
  }

  if (!errorMessage == "") {
    return response.status(400).json(errorMessage);
  }

  next();
};

module.exports = {
  validateName,
};
