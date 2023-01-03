require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const corsOptions = {
  origin: "http://localhost:3000"
};


// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
 /* db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
}); */ 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Land Finder API Restful By Bantra Tech (v1.0.0) 2022" });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/company.routes.js")(app);

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
const { compareSync } = require("bcrypt");
app.use(history());

// set port, listen for requests
app.set('port', process.env.SERVER_PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Server run on port: ' + app.get('port'));
});


