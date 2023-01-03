const db = require("../models");
const Company = db.company;

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
        res.status(201).send({ message: "Record successfully saved!", company: company });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the record"
        });
    });
}

  