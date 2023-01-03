require("dotenv").config();

module.exports = {
  secret: process.env.SECRET_KEY,
  jwtExpiration: 3600,//process.env.TOKEN_EXP,           // 1 hour
  jwtRefreshExpiration: 86400//process.env.REFRESH_TOKEN_EXP,   // 24 hours
  /* for test */
  // jwtExpiration: 60,          // 1 minute// 
  // jwtRefreshExpiration: 120,  // 2 minutes
};