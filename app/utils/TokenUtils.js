const jwt = require('jsonwebtoken');
const jwtConfig = require("../config/jwt.config");

exports.decodeToken = (header) => {
  let token = header;
  token = token.replace('Bearer ', '');
  return jwt.decode(token);
}

exports.createToken = (decodeData, expiresIn) => {
  var token = jwt.sign({ data: decodeData }, jwtConfig.secret, {
    expiresIn: expiresIn // 24 hours
  });
  return token;
}