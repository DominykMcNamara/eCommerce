const userRouter = require("./user");
const authRouter = require("./auth");
module.exports = (app, passport) => {
  userRouter(app);
  authRouter(app, passport);
};
