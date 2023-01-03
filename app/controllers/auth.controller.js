const jwtConfig = require("../config/jwt.config");
const db = require("../models");
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
        res.status(201).send({ message: "Record successfully saved!", user: user });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the record"
        });
    });
}

exports.signin = (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then(user => {

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, jwtConfig.secret, {
            expiresIn: jwtConfig.jwtExpiration // 24 hours
        });

        user.password = "";

        //res.cookie('auth-token', token, { httpOnly: true, secure: false });

        res.status(200).send({ message: "User logged in.", token: token, user: user });
        
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.logout = (req, res) => {
    res.clearCookie('auth-token');
    res.status(200).send({ message: 'User logged out.' });
}

exports.resetPassword = (req, res) => {
    User.findByEmail(req.params.email, (err, results) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: "Not found record: " + req.params.email
          });
        } else {
          return res.status(500).send({
            message: "Error retrieving record: " + req.params.email
          });
        }
      } else {
        var newRefreshToken = RefreshToken.create(results, (tErr, tResults) => { });
        sendMail(results.email, newRefreshToken, results.id).then(()=>{
          return res.status(200).send({
            message: "Check your email for a link to reset your password."
          });
        }).catch((err) => {
          return res.status(400).send({
            message: err
          });
        });
       
      } 
    });
  };
  