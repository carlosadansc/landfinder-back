module.exports = app => {
    const company = require("../controllers/company.controller.js");
    const {authJwt} = require('../middlewares');
  
    app.post("/company/create", authJwt.verifyToken, company.create);

  };            