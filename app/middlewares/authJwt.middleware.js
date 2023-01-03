const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config.js");


const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }
    return res.status(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    token = token.replace('Bearer ', '')
    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            return catchError(err, res);
        }
        req.user = user;
        next();
    });
}

const authJwt = {
    verifyToken: verifyToken
}

module.exports = authJwt;