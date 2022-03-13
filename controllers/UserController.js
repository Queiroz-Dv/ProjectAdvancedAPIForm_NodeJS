const res = require("express/lib/response");
var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
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
    response.status(200);
    response("Ok");
  }
  async edit(request, response) {
    var { id, name, role, email } = request.body;
    var result = await User.update(id, email, name, role);
    if (result != undefined) {
      if (result.status) {
        response.status(200);
        response.send("Ok");
      } else {
        response.status(406);
        response.send(result.error);
      }
    } else {
      response.status(406);
      response.send("Erro no servidor");
    }
  }

  //Remover usuário
  async remove(request, response) {
    var id = request.params.id;
    var result = await User.delete(id);
    if (result.status) {
      response.status(200);
      response.send("Ok");
    } else {
      response.status(406);
      response.send(result.error);
    }
  }

  //Método de recuperar senha 
  async recoverPassword(request, response) {
    var email = request.body.email;
    var result = await PasswordToken.create(email);
    if (result.status) {
      response.status(200);
      response.send("" + result.token);
    } else {
      response.status(406);
      response.send(result.error);
    }
  }


  async changePassword(request, response) {
    var token = request.body.token;
    var password = request.body.password;

    var isTokenValid = await PasswordToken.validate(token);
    if (isTokenValid.status) {
      await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
      response.status(200)
      response.send("Senha alterada com sucesso.");
    } else {
      response.status(406);
      response.send("Token Inválido.");
    }
  }
}
module.exports = new UserController();