class UserController {
  async index(request, response) { }

  async create(request, response) {
    var { email, name, password } = request.body;
    if (email == undefined) {
      response.status(403);
      response.json({ error: "E-mail inválido!" })
    } else {
      response.status(200);
      response.json({ sucess: "E-mail cadastrado com sucesso" });
    }

    if (name == undefined) {
      response.status(403);
      response.json({ error: "Nome inválido!" })
    } else {
      response.status(200);
      response.json({ sucess: "Nome cadastrado com sucesso" });
    }

    if (password == undefined) {
      response.status(403);
      response.json({ error: "Senha inválido!" })
    } else {
      response.status(200);
      response.json({ sucess: "Senha cadastrado com sucesso" });
    }
  }

}
module.exports = new UserController();