const db = require("../models");
const Contract = db.contract;
const httpStatus = require("../common/HttpStatusCodes");
const errorCode = require("../common/ErroCodes");
const logger = require("../utils/Logger")

exports.create = (req, res) => {
    //Save contract to data base
    Contract.create({
        property_id: req.bod.property_id,
        type: req.bod.type,
        start_date: req.bod.start_date,
        end_date: req.bod.end_date,
        sign_date: req.bod.sign_date,
        url_doc: req.bod.url_doc,
        signed: req.bod.signed,
        status: req.bod.status
    }).then(contract => {
        res.status(httpStatus.CREATED).send({ data: contract, errors: [], warnings: [],});
    }).catch(err => {
        logger.log("POST", "/contract/create", "", err, false);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ data: {}, errors: [errorCode.ERR0000], });
    });
}

  