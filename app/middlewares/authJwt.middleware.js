const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config.js");
const httpStatus = require("../common/HttpStatusCodes");
const errorCode = require("../common/ErroCodes");
const logger = require("../utils/Logger")


const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(httpStatus.UNAUTHORIZED).send({ data: {}, errors: [errorCode.ERR0019], });
    }
    return res.status(httpStatus.UNAUTHORIZED).send({ data: {}, errors: [errorCode.ERR0018], });
}

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(httpStatus.FORBIDDEN).send({ data: {}, errors: [errorCode.ERR0018], });
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