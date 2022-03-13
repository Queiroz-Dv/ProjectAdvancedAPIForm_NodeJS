var knex = require("../database/connection");
var User = require("./User");

class PasswordToken {

  async create(email) {
    var user = await User.findByEmail(email);
    if (user != undefined) {
      try {
        var token = Date.now();
        await knex.insert({
          user_id: user.id,
          used: 0,
          token: token // Recomendado o UUID ou GUID
        }).table("passwordtokens");
        return { status: true, token: token }
      } catch (error) {
        console.log(error);
        return { status: false, error: error }
      }
    } else {
      return { status: false, error: "E-mail não existe." }
    }
  }
}
modules.exports = PasswordToken();