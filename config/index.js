const expressConfig = require("./express");
const errorHandler = require("../middleware/errorHandler");
const sessionLogger = require("../middleware/sessionLogger");
const routeConfig = require("../routes/index");

module.exports = async (app) => {
  const expressApp = await expressConfig(app);

  await routeConfig(app);
  app.use(sessionLogger);
  app.use(errorHandler);
};
