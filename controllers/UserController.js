const res = require("express/lib/response");
var User = require("../models/User");
class UserController {

  //Consulta Usuários
  async index(request, response) {
    var users = await User.findAll();
    response.json(users);
  }

  //Consulta um usuário 
  async findUser(request, response) {
    var id = rquest.params.id;
    var user = await User.findById(id);
    if (user == undefined) {
      response.status(404);
      response.json({});
    } else {
      response.status(200);
      response.json(user);
    }
  }
  //Cria usuários
  async create(request, response) {
    var { email, name, password } = request.body;
    if (email == undefined) {
      response.status(403);
      response.json({ error: "E-mail inválido!" })
    }

    if (name == undefined) {
      response.status(403);
      response.json({ error: "Nome inválido!" })
    }

    if (password == undefined) {
      response.status(403);
      response.json({ error: "Senha inválido!" })
    }
    
    //Validar email
    var emailExists = await User.findEmail(email);
    if (emailExists) {
      response.status(406);
      response.json({ error: "E-mail já cadastrado" })
      return;
    }

    await User.new(email, password, name);
  }
}
module.exports = new UserController();