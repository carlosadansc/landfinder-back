const db = require("../models");
const Contract = db.contract;

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
        res.status(201).send({ message: "Record successfully saved!", contract: contract });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the record"
        });
    });
}

  