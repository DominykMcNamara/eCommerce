const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const corsOptions = require("./corsOptions");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("../db/index");

module.exports = (app) => {
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
  return app
}
