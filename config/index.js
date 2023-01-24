const expressConfig = require("./express");
const errorHandler = require("../middleware/errorHandler");
const sessionLogger = require("../middleware/sessionLogger");
const routeConfig = require("../routes/index");
const passportConfig = require('./passport')

module.exports = async (app) => {
  const expressApp = await expressConfig(app);
  const passport = await passportConfig(expressApp)
  await routeConfig(app, passport);
  app.use(sessionLogger);
  app.use(errorHandler);
};
