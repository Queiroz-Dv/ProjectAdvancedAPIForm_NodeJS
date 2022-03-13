var jwt = require("jsonwebtoken");
var secret = "mxtarget"

module.exports = function (request, response, next) {
  const authToken = request.headers['authorization']

  if (authToken != undefined) {
    const bearer = authToken.split(' ');
    var token = bearer[1];
    try {
      var decoded = jwt.verify(token, secret);
      if (decoded.role == 1) {
        next();
      } else {
        response.status(403);
        response.send("Você não tem permissão");
        return;
      }
    } catch (error) {
      response.status(403);
      response.send("Você não está autenticado");
      return;
    }
  } else {
    response.status(403);
    response.send("Você não está autenticado");
    return;
  }
}