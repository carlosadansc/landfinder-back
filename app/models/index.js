const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    port: config.PORT,
    ssl: config.SSL,
    
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.property = require("../models/property.model.js")(sequelize, Sequelize);
db.company = require("../models/company.model.js")(sequelize, Sequelize);
db.contract = require("../models/contract.model.js")(sequelize, Sequelize);

//Create relations one user to many properties, generate foreignKey 
db.user.hasMany(db.property, {
  foreignKey: "user_id"
})

//Create relations one user to one company, generate foreignKey 
db.user.hasOne(db.company, {
  foreignKey: 'user_id'
});

//Create relations one property to one contract, generate foreignKey 
db.property.hasOne(db.contract, {
  foreignKey: 'property_id'
});

module.exports = db;