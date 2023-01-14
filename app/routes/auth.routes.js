module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const {verifySignUp, verifyToken} = require('../middlewares');
  
    app.post("/auth/signup", [verifySignUp.checkDuplicateEmail, verifySignUp.validatePassword], auth.singup);
    app.post("/auth/signin", auth.signin);
    //app.post("/auth/logout", auth.logout);
    app.get("/auth/forgot-password/:email", auth.forgotPassword);
  };            