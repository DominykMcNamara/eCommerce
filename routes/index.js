const userRouter = require("./user");
const authRouter = require("./auth");
const productRouter = require("./product")
module.exports = (app, passport) => {
  userRouter(app);
  authRouter(app, passport);
  productRouter(app)
};
