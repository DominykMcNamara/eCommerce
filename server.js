require("dotenv").config();
const express = require("express");
const app = express();
const mountRoutes = require("./routes");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
const session = require("express-session");
const passport = require("passport");
const db = require("./db/index");
const pgSession = require("connect-pg-simple")(session);
require("./config/passport");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(
  session({
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 Day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

mountRoutes(app);

app.listen(PORT, () => console.log(`Server running on ${PORT}.`));
