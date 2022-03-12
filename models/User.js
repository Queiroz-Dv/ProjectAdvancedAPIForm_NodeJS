var knex = require("../database/connection")
var bcrypt = require("bcrypt");
const { update } = require("../database/connection");
class User {
  async findAll() {
    try {
      var result = await knex.select(["id", "email", "role"]).table("users");
      return result;
    } catch (error) {
      console.log(error)
      return [];
    }

  }

  async findById(id) {
    try {
      var result = await knex.select(["id", "email", "role"]).where({ id: id }).table("users");
      if (result.length > 0) {
        return [0];
      } else {
        return undefined
      }
    } catch (error) {
      console.log(error)
      return undefined;
    }

  }

  async new(email, password, name) {
    try {
      var hash = await bcrypt.hash(password, 10);
      await knex.insert({ email, password: hash, name, role: 0 }).table("users");
    } catch (error) {
      console.log(error);
    }
  }

  async findEmail(email) {
    try {
      var result = await knex.
        select("*").
        from("users").
        where({ email: email });
      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
module.exports = new User();