const db = require("../models");
const Property = db.property;

exports.create = (req, res) => {
    //Save property to data base
    Property.create({
        user_id: req.body.user_id,
        name: req.body.name,
        description: req.body.description,
        preview_image: req.body.preview_image,
        cover_image: req.body.cover_image,
        images: req.body.images,
        sale_price: req.body.sale_price,
        area: req.body.area,
        street_num: req.body.street_num,
        hood: req.body.hood,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        buil_area: req.body.buil_area,
        class: req.body.class,
        vocation: req.body.vocation,
        share_percent: req.body.share_percent,
        script_model: req.body.script_model,
        enviroment_text: req.body.enviroment_text,
        ground_usage: req.body.ground_usage,
        height_floors: req.body.height_floors,
        height_meters: req.body.height_meters,
        share_value: req.body.share_value,
        buildable_area: req.body.buildable_area,
        sellable_area: req.body.sellable_area,
        cus: req.body.cus,
        cas: req.body.cas,
        cos: req.body.cos
    }).then(property => {
        res.status(201).send({ message: "Record successfully saved!", property: property });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the record"
        });
    });
}

  