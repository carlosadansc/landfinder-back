const db = require("../models");
const User = db.user;
const httpStatus = require("../common/HttpStatusCodes");
const errorCode = require("../common/ErroCodes");
const logger = require("../utils/Logger")

validatePassword = (req, res, next) => {
  // password min 6 chars
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      message: 'Inconrrect password, required 6 digits min.'
    });
  }

  // password (repeat) does not match
  if (!req.body.password_rep || req.body.password != req.body.password_rep) {
    return res.status(400).send({
      message: 'Paswords doesnt match.'
    });
  }

  next();
};

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      logger.log("POST", "/auth/signup", req.body.email, errorCode.ERR0013.title, false);
      res.status(httpStatus.CONFLICT).send({ data: {}, errors: [errorCode.ERR0013], });
      return;
    }

    next();
  });

};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  validatePassword: validatePassword
};

module.exports = verifySignUp;