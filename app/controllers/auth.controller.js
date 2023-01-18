const jwtConfig = require("../config/jwt.config");
const db = require("../models");
const logger = require("../utils/Logger")
const { createToken } = require("../utils/TokenUtils")
const { sendMailForgotPassword, sendConfirmEmail } = require("../utils/Mailer")
const httpStatus = require("../common/HttpStatusCodes");
const errorCode = require("../common/ErroCodes");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


exports.singup = (req, res) => {
  //Save user to data base
  User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
    user_type: req.body.user_type
  }).then(user => {
    user.password = "";
    res.status(httpStatus.CREATED).send({ data: user, errors: [], warnings: [], });
    //res.status(httpStatus.CREATED).send({ message: "Record successfully saved!", user: user });
  }).catch(err => {
    logger.log("POST", "/auth/singup", "", err, false);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ data: {}, errors: [errorCode.ERR0000], warnings: [], })
    // res.status(500).send({
    //     message: err.message || "Some error occurred while creating the record"
    // });
  });
}

exports.signin = (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then(user => {

    if (!user) {
      logger.log("POST", "/auth/signin", req.body.email, errorCode.ERR0001.title, false);
      return res.status(httpStatus.NOT_FOUND).send({ data: {}, errors: [errorCode.ERR0001], });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      logger.log("POST", "/auth/signin", req.body.email, errorCode.ERR0017.title, false);
      return res.status(httpStatus.UNAUTHORIZED).send({ data: {}, errors: [errorCode.ERR0017], });
    }

    var token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.jwtExpiration // 24 hours
    });

    user.password = "";

    //res.cookie('auth-token', token, { httpOnly: true, secure: false });

    res.status(httpStatus.ACCEPTED).send({ data: { token: token, user: user }, errors: [], });

  }).catch(err => {
    logger.log("POST", "/auth/signin", req.body.email, err, false);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ data: {}, errors: [errorCode.ERR0000], });
  });
}

/* exports.logout = (req, res) => {
  res.clearCookie('auth-token');
  res.status(200).send({ message: 'User logged out.' });
} */

exports.forgotPassword = (req, res) => {

  User.findOne({ where: { email: req.params.email } }).then(user => {

    if (!user) {
      logger.log("GET", "/auth/forgot-password", req.params.email, errorCode.ERR0001.title, false);
      return res.status(httpStatus.NOT_FOUND).send({ data: {}, errors: [errorCode.ERR0001], });
    }

    var _newToken = createToken(user.email, 120);

    sendMailForgotPassword(user.email, _newToken, user.id).then(() => {
      res.status(httpStatus.ACCEPTED).send({ data: {}, errors: [], });
    }).catch((err) => {
      logger.log("GET", "/auth/forgot-password", req.params.email, err, false);
      return res.status(httpStatus.BAD_REQUEST).send({ data: {}, errors: [errorCode.ERR0008], });
    });

  }).catch(err => {
    logger.log("GET", "/auth/forgot-password", req.params.email, err, false);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ data: {}, errors: [errorCode.ERR0000], });
  });

};

exports.resetPassword = (req, res) => {
  User.update({ 
    password:  bcrypt.hashSync(req.body.password, 8)}, {
    where: {
      email: req.body.email
    }
  }).then(data => {
    res.status(httpStatus.ACCEPTED).send({ data: {}, errors: [], });
  }).catch(err => {
    logger.log("GET", "/auth/reset-password", "", err, false);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ data: {}, errors: [errorCode.ERR0000], });
  });
};

exports.sendEmailConfirmation = (req, res) => {

  User.findOne({ where: { email: req.params.email } }).then(user => {

    if (!user) {
      logger.log("GET", "/auth/send-email-confirmation", req.params.email, errorCode.ERR0001.title, false);
      return res.status(httpStatus.NOT_FOUND).send({ data: {}, errors: [errorCode.ERR0001], });
    }

    var _newToken = createToken(user.email, 120);

    sendConfirmEmail(user.email, _newToken).then(() => {
      res.status(httpStatus.ACCEPTED).send({ data: {}, errors: [], });
    }).catch((err) => {
      logger.log("GET", "/auth/send-email-confirmation", req.params.email, err, false);
      return res.status(httpStatus.BAD_REQUEST).send({ data: {}, errors: [errorCode.ERR0008], });
    });

  }).catch(err => {
    logger.log("GET", "/auth/send-email-confirmation", req.params.email, err, false);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ data: {}, errors: [errorCode.ERR0000], });
  });

};

exports.confirmEmail = (req, res) => {
  User.update({ 
    email_confirmed: 1}, {
    where: {
      email: req.params.email
    }
  }).then(data => {
    res.status(httpStatus.ACCEPTED).send({ data: {}, errors: [], });
  }).catch(err => {
    logger.log("GET", "/auth/confirm-email", "", err, false);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ data: {}, errors: [errorCode.ERR0000], });
  });
};