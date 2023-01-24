const expressConfig = require("./express");
const routeConfig = require("../routes/index");
const passportConfig = require('./passport')

module.exports = async (app) => {
  const expressApp = await expressConfig(app);
  const passport = await passportConfig(expressApp)
  await routeConfig(app, passport);

  
};
