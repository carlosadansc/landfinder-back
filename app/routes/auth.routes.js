module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const {verifySignUp, verifyToken} = require('../middlewares');
  
    app.post("/auth/signup", [verifySignUp.checkDuplicateEmail, verifySignUp.validatePassword], auth.singup);
    app.post("/auth/signin", auth.signin);
    //app.post("/auth/logout", auth.logout);
    app.get("/auth/forgot-password/:email", auth.forgotPassword);
    app.put("/auth/reset-password/", auth.resetPassword);
    app.get("/auth/send-confirm-email/:email", auth.sendEmailConfirmation);
    app.get("/auth/confirm-email/:email", auth.confirmEmail);
  };            