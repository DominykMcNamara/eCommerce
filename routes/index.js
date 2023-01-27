const userRouter = require("./user");
const authRouter = require("./auth");
const productRouter = require("./product")
const orderRouter = require("./order")
const cartRouter = require("./cart")
module.exports = (app, passport) => {
  userRouter(app);
  authRouter(app, passport);
  productRouter(app)
  orderRouter(app)
  cartRouter(app)
};
