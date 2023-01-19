require("dotenv").config();
const express = require("express");
const app = express();
const mountRoutes = require('./routes')
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mountRoutes(app)

app.listen(PORT, () => console.log(`Server running on ${PORT}.`));
