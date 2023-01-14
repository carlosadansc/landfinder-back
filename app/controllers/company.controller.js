const db = require("../models");
const Company = db.company;
const httpStatus = require("../common/HttpStatusCodes");
const errorCode = require("../common/ErroCodes");
const logger = require("../utils/Logger")

exports.create = (req, res) => {
    //Save company to data base
    Company.create({
        user_id: req.bod.user_id,
        rfc: req.body.rfc,
        name: req.body.name,
        description: req.body.description,
        logotype: req.body.logotype,
        employees_number: req.body.employees_number,
        phone_office: req.body.phone_office,
        phone_office_ext: req.body.phone_office_ext,
        domain: req.body.domain,
        email: req.body.email,
        street_num: req.body.street_num,
        hood: req.body.hood,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        investment_mount: req.body.investment_mount,
        type: req.body.type
    }).then(company => {
        res.status(httpStatus.CREATED).send({ data: company, errors: [], warnings: [],});
    }).catch(err => {
        logger.log("POST", "/company/create", "", err, false);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ data: {}, errors: [errorCode.ERR0000], });

    });
}

  