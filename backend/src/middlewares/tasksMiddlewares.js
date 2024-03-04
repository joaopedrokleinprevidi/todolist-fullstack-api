const validateName = (request, response, next) => {
  const { body } = request;

  let errorMessage = "";

  if (body.nome == "") {
    errorMessage = 'O campo "nome" não pode ser vazio.';
  }

  if (body.nome == undefined) {
    errorMessage = 'O campo "nome" deve conter algum valor. ';
  }

  if (body.nome.length <= 3) {
    errorMessage = 'O campo "nome" deve conter no mínimo 4 caracteres.';
  }

  if (!errorMessage == "") {
    return response.status(400).json(errorMessage);
  }

  next();
};

module.exports = {
  validateName,
};